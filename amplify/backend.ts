import { Stack } from "aws-cdk-lib";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { EventSourceMapping, StartingPosition } from "aws-cdk-lib/aws-lambda";

import { defineBackend } from "@aws-amplify/backend";

import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { myDynamoDBFunction } from "./functions/dynamoDB-function/resource";
import { storage } from "./storage/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  myDynamoDBFunction,
  storage,
});

const sessionAttendedTable = backend.data.resources.tables["SessionAttended"];
const tableStreamArn = sessionAttendedTable.tableStreamArn || "";

// adds the policy to the table stack
const newPolicy = new Policy(Stack.of(sessionAttendedTable), "DynamoDBPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "dynamodb:DescribeStream",
        "dynamodb:GetRecords",
        "dynamodb:GetShardIterator",
        "dynamodb:ListStreams",
        "dynamodb:GetItem",
        "dynamodb:BatchGetItem",
        "dynamodb:Scan",
        "dynamodb:Query",
        "dynamodb:ConditionCheckItem",
      ],
      resources: [tableStreamArn],
    }),
  ],
});

// attach policy to lambda role
const lambdaRole = backend.myDynamoDBFunction.resources.lambda.role;
lambdaRole?.attachInlinePolicy(newPolicy);

// create the stream trigger on the lambda
const eventSourceMapping = new EventSourceMapping(
  Stack.of(sessionAttendedTable),
  "DynamoDBSource",
  {
    eventSourceArn: tableStreamArn,
    startingPosition: StartingPosition.LATEST,
    batchSize: 1,
    target: backend.myDynamoDBFunction.resources.lambda,
    retryAttempts: 1,
  },
);

// adds a dependancy to prevent a race condition
eventSourceMapping.node.addDependency(newPolicy);

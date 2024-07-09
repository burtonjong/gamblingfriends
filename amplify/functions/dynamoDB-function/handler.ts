import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { DynamoDBStreamHandler } from "aws-lambda";

import { type Schema } from "@/../../amplify/data/resource";
import { data } from "@/../../amplify_outputs.json";
import { Logger } from "@aws-lambda-powertools/logger";
import type { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const logger = new Logger({
  logLevel: "INFO",
  serviceName: "dynamodb-stream-handler",
});

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT as string,
        region: process.env.AWS_REGION,
        defaultAuthMode: "identityPool",
        modelIntrospection: data.model_introspection as any,
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            sessionToken: process.env.AWS_SESSION_TOKEN as string,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  },
);

const dataClient = generateClient<Schema>();

export const handler: DynamoDBStreamHandler = async (event) => {
  for (const record of event.Records) {
    logger.info(`Processing record: ${record.eventID}`);
    logger.info(`Event Type: ${record.eventName}`);

    if (record.dynamodb && record.dynamodb.NewImage) {
      const newImage = unmarshall(
        record.dynamodb.NewImage as Record<string, AttributeValue>,
      );

      logger.info(`New Image: ${JSON.stringify(newImage)}`);

      if (record.eventName === "INSERT" || record.eventName === "MODIFY") {
        const userId = newImage.id as string;
        const profit = newImage.profitThatSession;

        logger.info(`User id: ${userId}`);

        // Fetch the current totalProfit
        // const user = await dynamoDb.get({
        //   TableName: usersTable,
        //   Key: { userId }
        // }).promise();

        try {
          const user = await dataClient.models.User.get({ id: userId });
          const totalProfit = (user.data?.totalEarnings || 0) + profit;
          const response = await dataClient.models.User.update({
            id: userId,
            totalEarnings: totalProfit,
          });
          logger.info(`User updated: ${JSON.stringify(response)}`);
        } catch (error) {
          logger.error(`Error fetching user: ${error}`);
        }

        // Update the totalProfit
        // await dynamoDb.update({
        //   TableName: usersTable,
        //   Key: { userId },
        //   UpdateExpression: 'SET totalProfit = :val',
        //   ExpressionAttributeValues: { ':val': totalProfit }
        // }).promise();
      } else if (record.eventName === "REMOVE") {
        // const oldImage = unmarshall(record.dynamodb.OldImage);
        // const userId = oldImage.userId;
        // const profit = oldImage.profitThatSession;
        // Fetch the current totalProfit
        // const user = await dynamoDb.get({
        //   TableName: usersTable,
        //   Key: { userId }
        // }).promise();
        // const totalProfit = (user.Item?.totalProfit || 0) - profit;
        // Update the totalProfit
        // await dynamoDb.update({
        //   TableName: usersTable,
        //   Key: { userId },
        //   UpdateExpression: 'SET totalProfit = :val',
        //   ExpressionAttributeValues: { ':val': totalProfit }
        // }).promise();
      }
    }
  }

  logger.info(`Successfully processed ${event.Records.length} records.`);

  return {
    batchItemFailures: [],
  };
};

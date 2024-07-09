import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { DynamoDBStreamHandler } from "aws-lambda";

import { type Schema } from "@/../../amplify/data/resource";
import { Logger } from "@aws-lambda-powertools/logger";
import type { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

import { updateUser } from "./graphql/mutations";
import { getUser } from "./graphql/queries";

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
        defaultAuthMode: "iam",
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
        const userId = newImage.sessionAttendedId as string;
        const earnings = newImage.earningsThatSession;

        logger.info(`profit that session: ${earnings}`);

        try {
          const user = await dataClient.graphql({
            query: getUser,
            variables: {
              id: userId,
            },
          });

          const totalEarnings =
            (user.data.getUser?.totalEarnings || 0) + earnings;
          logger.info(`User: ${user}`);
          logger.info(`Total Profit: ${totalEarnings}`);

          const response = await dataClient.graphql({
            query: updateUser,
            variables: {
              input: {
                id: userId,
                totalEarnings: totalEarnings,
              },
            },
          });
          logger.info(
            `User updated after addition of session: ${JSON.stringify(response)}`,
          );
        } catch (error) {
          logger.error(`Error fetching user: ${JSON.stringify(error)}`);
        }
      } else if (record.eventName === "REMOVE") {
        const oldImage = unmarshall(
          record.dynamodb.OldImage as Record<string, AttributeValue>,
        );
        const userId = oldImage.sessionAttendedId as string;
        const profit = oldImage.earningsThatSession;
        try {
          const user = await dataClient.graphql({
            query: getUser,
            variables: {
              id: userId,
            },
          });

          const totalEarnings =
            (user.data.getUser?.totalEarnings || 0) - profit;

          const response = await dataClient.graphql({
            query: updateUser,
            variables: {
              input: {
                id: userId,
                totalEarnings: totalEarnings,
              },
            },
          });
          logger.info(
            `User updated after deletion of session: ${JSON.stringify(response)}`,
          );
        } catch (error) {
          logger.error(`Error fetching user: ${JSON.stringify(error)}`);
        }
      }
    }
  }

  logger.info(`Successfully processed ${event.Records.length} records.`);

  return {
    batchItemFailures: [],
  };
};

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { PreSignUpTriggerHandler } from "aws-lambda";

import { type Schema } from "@/../../amplify/data/resource";
import { data } from "@/../../amplify_outputs.json";

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

export const dataClient = generateClient<Schema>();

export const handler: PreSignUpTriggerHandler = async (event) => {
  return await dataClient.models.User.create({
    firstName: "",
    lastName: "",
    role: "GuestUser",
    id: event.userName,
    email: event.request.userAttributes.email,
    totalEarnings: 0,
    // profileOwner: `${event.userName}::${event.userName}`,
  })
    .then((user) => {
      if (user.errors) {
        throw new Error("Failed to create user in DB");
      }
      console.log("User created", user);
      return event;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

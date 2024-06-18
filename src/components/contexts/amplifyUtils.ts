import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

import { createServerRunner } from "@aws-amplify/adapter-nextjs";

// eslint-disable-next-line no-restricted-imports
import config from "../../../amplify_outputs.json";

// components/ConfigureAmplify.tsx

export const { runWithAmplifyServerContext } = createServerRunner({
  config: config,
});

export const isAuthenticated = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        console.log("User: ", !!user);
        return !!user;
      } catch (error) {
        console.log("Error checking if user is authenticated", error);
        return false;
      }
    },
  });

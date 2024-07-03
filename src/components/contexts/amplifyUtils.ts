import { fetchAuthSession } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

import { createServerRunner } from "@aws-amplify/adapter-nextjs";

// eslint-disable-next-line no-restricted-imports
import config from "../../../amplify_outputs.json";

// components/ConfigureAmplify.tsx

export const { runWithAmplifyServerContext } = createServerRunner({
  config: config,
});

export async function isAuthenticated() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec: any) => fetchAuthSession(contextSpec),
    });

    return !!currentUser;
  } catch (error) {
    console.error(error);
    return false;
  }
}

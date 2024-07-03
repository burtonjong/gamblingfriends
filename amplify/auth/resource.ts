import { defineAuth } from "@aws-amplify/backend";

import { postConfirmation } from "./post-confirmation/resource";
import { preSignUp } from "./pre-sign-up/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ["AdminUser", "GuestUser", "FirstTimeUser"],
  triggers: {
    postConfirmation,
    preSignUp,
  },
  access: (allow) => [allow.resource(postConfirmation).to(["addUserToGroup"])],
});

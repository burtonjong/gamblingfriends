import { defineFunction } from "@aws-amplify/backend";

export const postConfirmation = defineFunction({
  name: "post-confirmation",
  entry: "./handler.ts",
  runtime: 20,
});

import { defineFunction } from "@aws-amplify/backend";

export const postConfirmation = defineFunction({
  name: "post-confirmation",
  runtime: 20,
  entry: "./handler.ts",
});

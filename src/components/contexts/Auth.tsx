"use client";

import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";

import config from "../../../amplify_outputs.json";

Amplify.configure(config, { ssr: true });

const Auth = ({ children }: { children: React.ReactNode }) => {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};

export default Auth;

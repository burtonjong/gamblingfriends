"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { type AuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import FormFields from "./FormFields";

export default function AuthClient() {
  const formFields: AuthenticatorProps["formFields"] = {
    signUp: {},
  };
  return (
    <Authenticator formFields={formFields} signUpAttributes={[]}>
      {({ user }) => {
        if (user) return <FormFields user={user} />;
        return <div>Error, please try again later</div>;
      }}
    </Authenticator>
  );
}

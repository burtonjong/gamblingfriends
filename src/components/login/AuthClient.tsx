"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// const formFields = {
//   signUp: {
//     email: {
//       order: 1,
//     },
//     name: {
//       order: 2,
//     },
//     password: {
//       order: 3,
//     },
//     confirm_password: {
//       order: 4,
//     },
//   },
// };

export default function AuthClient() {
  return <Authenticator />;
  // <Authenticator formFields={formFields} loginMechanisms={["email"]}>
  //   {({ signOut, user }) => (
  //     <main>
  //       <h1>Hello {user?.username}</h1>
  //       <button onClick={signOut}>Sign out</button>
  //     </main>
  //   )}
  // </Authenticator>
}

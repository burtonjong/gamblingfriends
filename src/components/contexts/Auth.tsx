"use client";

import { Amplify } from "aws-amplify";
import React from "react";

import { Authenticator } from "@aws-amplify/ui-react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import outputs from "../../../amplify_outputs.json";

Amplify.configure(outputs, { ssr: true });

export default function AuthQueryProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            console.error("Query Boundary Caught:", error, query);
          },
          onSuccess(data, query) {
            console.log(data, query);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, variables, context, mutation) => {
            console.error(
              "Mutation Boundary Caught:",
              error,
              variables,
              context,
              mutation,
            );
          },
          onSuccess(data, variables, context, mutation) {
            console.log(data, variables, context, mutation);
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </QueryClientProvider>
  );
}

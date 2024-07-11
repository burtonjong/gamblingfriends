"use client";

import { generateClient } from "aws-amplify/api";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useContext } from "react";
import { type ReactNode, createContext, useEffect } from "react";

import { type Schema } from "@/../amplify/data/resource";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  children: ReactNode | ReactNode[];
}

export enum UserType {
  AdminUser = "AdminUser",
  GuestUser = "GuestUser",
  FirstTimeUser = "FirstTimeUser",
}

export interface IUser {
  username: string;
  type: UserType;
  firstName?: string;
  lastName?: string;
  email?: string;
  signedIn?: boolean;
  role?: string;
}

interface IUserReturn {
  data: IUser;
  isFetching: boolean;
}

const client = generateClient<Schema>();

export const UserContext = createContext<IUserReturn>({} as IUserReturn);

export function UserContextProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      try {
        const user = await fetchAuthSession();

        if (
          (
            user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
          )?.[0] === undefined
        ) {
          // Logout User if not in group
          signOut();
          console.error("User not in group");
        }
        if (!user.userSub) {
          throw new Error("No user");
        }

        try {
          const response = await client.models.User.get({
            id: user.userSub as string,
          });

          if (response.data === null) {
            // Logout User record does not exist in DB
            signOut();
            console.error("User not in DB");
          }

          return {
            username: user.tokens?.accessToken.payload.username as string,
            type: (
              user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
            )?.[0],
            email: response.data?.email ?? "",
            firstName: response.data?.firstName ?? "",
            lastName: response.data?.lastName ?? "",
            role: response.data?.role ?? "",
          } as IUser;
        } catch (error) {
          console.error(error);
        }
        // Set user information based on the authentication session...
      } catch (error) {
        if (String(error).includes("No user")) {
          console.info("Not Logged in");
          return {
            username: "",
            type: UserType.FirstTimeUser,
            role: UserType.FirstTimeUser,
          } as IUser;
        } else {
          console.error(error);
        }
      }
    },
  });

  // TO DO load other user info from table
  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          queryClient.invalidateQueries({
            queryKey: ["Users"],
            exact: true,
          });
          console.log("Signed In");
          break;
        case "signedOut":
          queryClient.setQueryData(["Users"], {
            username: "",
            type: UserType.FirstTimeUser,
            role: UserType.FirstTimeUser,
          } as IUser);
          console.log("Signed Out");
          break;
      }
    });

    // Clean up the listener
    return () => {
      hubListenerCancel();
    };
  }, []);
  return (
    <UserContext.Provider
      value={{
        data: data || { username: "", type: UserType.FirstTimeUser },
        isFetching,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): IUserReturn {
  return useContext(UserContext);
}

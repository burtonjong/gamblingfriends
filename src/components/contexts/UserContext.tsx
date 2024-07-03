"use client";

import { generateClient } from "aws-amplify/api";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useContext } from "react";
import { type ReactNode, createContext, useEffect, useState } from "react";

import { type Schema } from "@/../amplify/data/resource";

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
  populated: boolean;
  signedIn?: boolean;
  role?: string;
}

interface IUserReturn {
  currentUser: IUser;
  // setCurrentUser: (state: IUser) => void;
}

const client = generateClient<Schema>();

export const UserContext = createContext<IUserReturn>({} as IUserReturn);

export function UserContextProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<IUser>({
    username: "",
    type: UserType.FirstTimeUser,
    populated: false,
  });

  // TO DO load other user info from table
  useEffect(() => {
    async function currentAuthenticatedUser() {
      try {
        const user = await fetchAuthSession();
        console.log(user);

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
        console.log(user.userSub);

        try {
          const response = await client.models.User.get({
            id: user.userSub as string,
          });

          if (response.data === null) {
            // Logout User record does not exist in DB
            signOut();
            console.error("User not in DB");
          }

          setCurrentUser({
            username: user.tokens?.accessToken.payload.username as string,
            type: (
              user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
            )?.[0],
            populated: true,
            email: response.data?.email ?? "",
            firstName: response.data?.firstName ?? "",
            lastName: response.data?.lastName ?? "",
            role: response.data?.role ?? "",
          });
        } catch (error) {
          console.error(error);
        }

        // Set user information based on the authentication session...
      } catch (error) {
        if (String(error).includes("No user")) {
          console.info("Not Logged in");
          setCurrentUser({
            username: "",
            type: UserType.FirstTimeUser,
            populated: true,
            role: UserType.FirstTimeUser,
          });
        } else {
          console.error(error);
        }
      }
    }

    currentAuthenticatedUser();

    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          currentAuthenticatedUser();
          console.log("Signed In");
          break;
        case "signedOut":
          setCurrentUser({
            username: "",
            type: UserType.FirstTimeUser,
            populated: true,
            role: UserType.FirstTimeUser,
          });
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
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): IUserReturn {
  return useContext(UserContext);
}

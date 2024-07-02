"use client";

import { generateClient } from "aws-amplify/api";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { useContext } from "react";
import { type ReactNode, createContext, useEffect, useState } from "react";

import { type Schema } from "@/../amplify/data/resource";

interface Props {
  children: ReactNode | ReactNode[];
}

export enum UserType {
  AdminUser = "AdminUser",
  GuestUser = "GuestUser",
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
    type: UserType.GuestUser,
    populated: false,
  });
  // TO DO load other user info from table
  useEffect(() => {
    async function currentAuthenticatedUser() {
      try {
        const user = await fetchAuthSession();
        console.log(user);
        if (!user.userSub) {
          throw new Error("No user");
        }

        if (
          (
            user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
          )?.[0] === undefined
        ) {
          // Logout User if not in group
          signOut();
          console.error("User not in group");
        }

        const response = await client.models.User.get({
          id: user.tokens?.accessToken.payload.username as string,
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
      } catch (err) {
        if (String(err).includes("No user")) {
          console.info("Not Logged in");
        } else {
          console.error(err);
        }
      }
    }
    void currentAuthenticatedUser();
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

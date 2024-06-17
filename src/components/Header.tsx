"use client";

import { signOut } from "aws-amplify/auth";

import { useUser } from "./contexts/UserContext";

export default function Header() {
  const user = useUser().currentUser;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex h-24 flex-row items-center justify-evenly bg-slate-500">
      <a href="/spreadsheet">Spreadsheet</a>
      <a href="/">Home</a>
      <a href="/planner">Planner</a>
      {user ? (
        <a href="/login">
          <button onClick={handleSignOut}>Logout</button>
        </a>
      ) : (
        <a href="/login">Login</a>
      )}
    </div>
  );
}

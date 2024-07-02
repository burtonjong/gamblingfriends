"use client";

import { signOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({
  isSignedIn,
}: {
  isSignedIn: boolean | undefined;
}) {
  const [authCheck, setAuthCheck] = useState(isSignedIn);

  const router = useRouter();
  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setAuthCheck(true);
          router.push("/home");
          break;
        case "signedOut":
          setAuthCheck(false);
          router.push("/");
          break;
      }
    });

    return () => {
      hubListenerCancel();
    };
  }, [router]);

  const handleSignOutSignIn = async () => {
    if (authCheck) {
      await signOut();
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    console.log("isSignedIn: ", isSignedIn);
  }, [authCheck]);

  const defaultRoutes = [
    { name: "Spreadsheet", href: "/spreadsheet", loggedIn: true },
    { name: "Home", href: "/home", loggedIn: true },
    { name: "Planner", href: "/planner", loggedIn: true },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === authCheck || route.loggedIn === undefined,
  );

  return (
    <div className="flex h-24 flex-row items-center justify-evenly bg-slate-500">
      {routes.map((route) => (
        <Link key={route.name} href={route.href}>
          {route.name}
        </Link>
      ))}
      <button
        className="rounded-xl bg-teal-600 px-4 py-2 font-bold text-white"
        onClick={handleSignOutSignIn}
      >
        {authCheck ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
}

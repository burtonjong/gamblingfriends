"use client";

import { useUser } from "@/components/contexts/UserContext";
import CountdownTimer from "@/components/homepage/CountdownTimer";
import Podium from "@/components/homepage/Podium";

export default function Home() {
  const data = useUser().data;
  const isFetching = useUser().isFetching;
  return (
    <>
      {data.type === "FirstTimeUser" ? (
        <div className="flex min-h-screen w-full flex-row items-center justify-around p-10">
          <h1>Login First</h1>
        </div>
      ) : (
        <>
          {isFetching ? (
            <div className="flex min-h-screen w-full flex-row items-center justify-around p-10">
              <h1>Loading... </h1>
            </div>
          ) : (
            <div className="flex min-h-screen w-full flex-row items-center justify-around p-10">
              <div className="">
                <Podium />
              </div>
              <div className="">
                <CountdownTimer />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

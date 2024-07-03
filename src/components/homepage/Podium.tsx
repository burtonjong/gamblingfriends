"use client";

import { generateClient } from "aws-amplify/data";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { type Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function Podium() {
  const [rankType, setRankType] = useState(true);
  const { data, isFetching } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["Users", {}],
    queryFn: async () => {
      try {
        const usersResponse = await client.models.User.list();
        const usersWithSessions = await Promise.all(
          usersResponse.data.map(async (user) => {
            const sessionsResponse = await client.models.SessionsAttended.list({
              filter: { sessionAttendedId: { eq: user.id } },
            });
            return {
              ...user,
              sessionsAttended: sessionsResponse.data,
            };
          }),
        );
        return usersWithSessions;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const sortProfit = (sortType: boolean) => {
    try {
      if (sortType) {
        return data?.sort(
          (a, b) => (b?.totalEarnings ?? 0) - (a?.totalEarnings ?? 0),
        );
      } else {
        return data?.sort(
          (a, b) =>
            (b?.totalEarnings ?? 0) / (b.sessionsAttended.length || 1) -
            (a?.totalEarnings ?? 0) / (a.sessionsAttended.length || 1),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-5 w-80 bg-slate-500 p-5">
      <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
      <button
        onClick={() => setRankType(true)}
        className={`rounded-l-lg border-2 border-slate-800 ${rankType ? "bg-slate-800 text-white" : "bg-white"} p-1 font-bold`}
      >
        Total
      </button>
      <button
        onClick={() => setRankType(false)}
        className={`rounded-r-lg border-2 border-slate-800 ${!rankType ? "bg-slate-800 text-white" : "bg-white"} p-1 font-bold`}
      >
        Average
      </button>
      <div>
        <div className="mx-5 my-2 flex items-center justify-between rounded-lg bg-slate-200 p-2 font-bold">
          <div>Place</div>
          <div>Name</div>
          <div>Profit</div>
        </div>
        <div>
          {isFetching ? (
            <h1>Loading.....</h1>
          ) : (
            sortProfit(rankType)?.map((user, index) => (
              <div
                key={user.id}
                className="m-5 flex items-center justify-between rounded-lg bg-slate-200 p-2"
              >
                <div
                  className={`size-10 ${index >= 3 ? "bg-slate-400" : index === 2 ? "bg-yellow-700" : index === 1 ? "bg-gray-400" : "bg-yellow-400"} mr-4 flex items-center justify-center rounded-full font-bold text-white`}
                >
                  {index + 1}
                </div>
                <p className="m-2 font-bold">{user.firstName}</p>
                <p className="font-bold">
                  {(user?.totalEarnings ?? 0) < 0 ? "-" : ""}$
                  {rankType
                    ? Math.abs(user?.totalEarnings ?? 0)
                    : Math.abs(
                        (user?.totalEarnings ?? 0) /
                          (user.sessionsAttended?.length || 1),
                      ) + "/day"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

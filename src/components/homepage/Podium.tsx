"use client";

import { useState } from "react";

const people = {
  Austin: {
    profit: 9000,
    daysAttended: 2,
  },
  Burton: {
    profit: 15,
    daysAttended: 5,
  },
  Matthew: {
    profit: -35,
    daysAttended: 5,
  },
  Anthony: {
    profit: 45,
    daysAttended: 10,
  },
  Alex: {
    profit: -55,
    daysAttended: 5,
  },
};

const sortProfit = (sortType: boolean) => {
  const peopleArray = Object.entries(people);
  if (sortType) {
    peopleArray.sort(
      ([, personA], [, personB]) => personB.profit - personA.profit,
    );
  } else {
    peopleArray.sort(
      ([, personA], [, personB]) =>
        personB.profit / personB.daysAttended -
        personA.profit / personA.daysAttended,
    );
  }
  const sortedPeople: Record<string, { profit: number; daysAttended: number }> =
    {};
  peopleArray.forEach(([name, data]) => {
    sortedPeople[name] = data;
  });
  return sortedPeople;
};

export default function Podium() {
  const [rankType, setRankType] = useState(true);

  return (
    <div className="mx-5 w-80 bg-slate-500 p-5">
      <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
      <button
        onClick={() => setRankType(true)}
        className={`rounded-bl-lg rounded-tl-lg border-2 border-slate-800 ${rankType ? "bg-slate-800 text-white" : "bg-white"} p-1 font-bold`}
      >
        Total
      </button>
      <button
        onClick={() => setRankType(false)}
        className={`rounded-br-lg rounded-tr-lg border-2 border-slate-800 ${!rankType ? "bg-slate-800 text-white" : "bg-white"} p-1 font-bold`}
      >
        Average
      </button>
      <div>
        <div className="mx-5 my-2 flex items-center justify-between rounded-lg bg-slate-200 p-2 font-bold">
          <div>Place</div>
          <div>Name</div>
          <div>Profit</div>
        </div>
        {Object.entries(
          rankType ? sortProfit(rankType) : sortProfit(rankType),
        ).map(([name, data], index) => (
          <div
            key={name}
            className="m-5 flex items-center justify-between rounded-lg bg-slate-200 p-2"
          >
            <div
              className={`h-10 w-10 ${index >= 3 ? "bg-slate-400" : index === 2 ? "bg-yellow-700" : index === 1 ? "bg-gray-400" : "bg-yellow-400"} mr-4 flex items-center justify-center rounded-full font-bold text-white`}
            >
              {index + 1}
            </div>
            <div className="m-2 font-bold">{name}</div>
            <div className="font-bold">
              {data.profit < 0 ? "-" : ""}$
              {rankType
                ? Math.abs(data.profit)
                : Math.abs(data.profit / data.daysAttended) + "/day"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

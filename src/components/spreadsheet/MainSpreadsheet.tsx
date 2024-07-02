"use client";

import { generateClient } from "aws-amplify/data";
import { useState } from "react";
import type { TableColumn } from "react-data-table-component";
import DataTable from "react-data-table-component";

import { useQuery } from "@tanstack/react-query";

import { type Schema } from "../../../amplify/data/resource";

type Nullable<T> = T | null;

const client = generateClient<Schema>();
const t1: TableColumn<{
  gamblerName: string;
  totalEarnings: Nullable<number> | undefined;
  sesssionsAttend: number;
}>[] = [
  {
    name: "Name",
    selector: (row) => row.gamblerName,
    sortable: true,
  },
  {
    name: "Total Earnings",
    selector: (row) => row.totalEarnings ?? 0,
    sortable: true,
  },
  {
    name: "Sessions Attended",
    selector: (row) => row.sesssionsAttend,
    sortable: true,
  },
];
const t2: TableColumn<{
  date: string;
  peopleAtSession: number;
}>[] = [
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "People At Session",
    selector: (row) => row.peopleAtSession,
    sortable: true,
  },
];

export default function MainSpreadsheet() {
  const [showTable, toggleShowTable] = useState(true);

  const { data, isFetching } = useQuery({
    initialData: [] as Schema["User"]["type"][],
    initialDataUpdatedAt: 0,
    queryKey: ["Users", {}],
    queryFn: async () => {
      try {
        const response = await client.models.User.list();
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex w-full flex-row">
      <div className="size-full">
        {isFetching ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <>
            <div className="flex flex-row gap-4">
              <button className="" onClick={() => toggleShowTable(true)}>
                Home
              </button>
              <button className="" onClick={() => toggleShowTable(false)}>
                Sessions Attended
              </button>
            </div>
            <div>
              {showTable ? (
                <DataTable
                  columns={t1}
                  data={
                    data?.map((user) => ({
                      gamblerName: user.firstName + " " + user.lastName,
                      totalEarnings: user.totalEarnings,
                      sesssionsAttend: user.sessionsAttended.length,
                    })) || []
                  }
                />
              ) : (
                <>
                  {/*<DataTable
                    columns={t2}
                    data={
                      data?.map((user) => ({
                        date: user.sessionsAttended.,
                      })) || []
                    }
                  />*/}
                  <div>
                    <a href="">beep</a>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

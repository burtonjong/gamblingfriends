"use client";

import { generateClient } from "aws-amplify/data";
import type { TableColumn } from "react-data-table-component";
import DataTable from "react-data-table-component";

import { useQuery } from "@tanstack/react-query";

import { type Schema } from "../../../amplify/data/resource";

type Nullable<T> = T | null;

const client = generateClient<Schema>();

// The first table coloumns and titles
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

export default function MainSpreadsheet() {
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
            <div>
              <DataTable
                columns={t1}
                data={
                  data?.map((user) => ({
                    gamblerName: user.firstName + " " + user.lastName,
                    totalEarnings: user.totalEarnings,
                    sesssionsAttend: user.sessionsAttended.length,
                  })) || []
                }
                pagination
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { generateClient } from "aws-amplify/data";
import DataTable, { TableColumn } from "react-data-table-component";

import { useQuery } from "@tanstack/react-query";

import { type Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();
interface DataRow {
  name: string;
  earnings: number;
  sesssionsAttend: number;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Earnings",
    selector: (row) => row.earnings,
    sortable: true,
  },
  {
    name: "Sessions Attended",
    selector: (row) => row.sesssionsAttend,
    sortable: true,
  },
];

const data = [
  { name: "Black Burton", earnings: 100, sesssionsAttend: 3 },
  { name: "Yellow Austin", earnings: 150, sesssionsAttend: 5 },
];

export default function MainSpreadsheet() {
  return (
    <div className="flex w-full flex-row">
      <div className="size-full">
        <div className="flex flex-row gap-4">
          <button className="">Earnings</button>
          <button className="">Sessions Attended</button>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

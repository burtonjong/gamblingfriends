"use client";

import { useState } from "react";

import AdminForm from "@/components/admin/AdminForm";
import SetTimer from "@/components/admin/SetTimer";

export default function Admin() {
  const [toggleSession, setToggleSession] = useState(true);
  return (
    <div className="flex min-h-screen w-full">
      <div className="bg-white">
        <button
          className="w-full rounded-lg p-5 font-bold hover:bg-slate-200"
          onClick={() => setToggleSession(true)}
        >
          Sessions
        </button>
        <button
          className="w-full rounded-lg p-5 font-bold hover:bg-slate-200"
          onClick={() => setToggleSession(false)}
        >
          Timer
        </button>
      </div>
      <div className="min-h-screen w-full flex-row items-center justify-center p-10">
        {toggleSession ? <AdminForm /> : <SetTimer />}
      </div>
    </div>
  );
}

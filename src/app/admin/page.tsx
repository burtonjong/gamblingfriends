"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import AdminForm from "@/components/admin/AdminForm";
import EditForm from "@/components/admin/EditForm";
import SetTimer from "@/components/admin/SetTimer";
import { UserType, useUser } from "@/components/contexts/UserContext";

enum Tab {
  AdminForm = "AdminForm",
  SetTimer = "SetTimer",
  EditForm = "EditForm",
}

export default function Admin() {
  const [toggleSession, setToggleSession] = useState(Tab.AdminForm);
  const router = useRouter();
  const user = useUser();

  if (user.data.type !== UserType.AdminUser) {
    router.push("/home");
  }

  return (
    <div className="flex min-h-screen w-full">
      {user.data.type !== UserType.AdminUser ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="bg-white">
            <button
              className="w-full rounded-lg p-5 font-bold hover:bg-slate-200"
              onClick={() => setToggleSession(Tab.AdminForm)}
            >
              Sessions
            </button>
            <button
              className="w-full rounded-lg p-5 font-bold hover:bg-slate-200"
              onClick={() => setToggleSession(Tab.SetTimer)}
            >
              Timer
            </button>
            <button
              className="w-full rounded-lg p-5 font-bold hover:bg-slate-200"
              onClick={() => setToggleSession(Tab.EditForm)}
            >
              Edit User
            </button>
          </div>
          <div className="min-h-screen w-full flex-row items-center justify-center p-10">
            {(() => {
              switch (toggleSession) {
                case Tab.AdminForm:
                  return <AdminForm />;
                case Tab.SetTimer:
                  return <SetTimer />;
                case Tab.EditForm:
                  return <EditForm />;
                default:
                  return <AdminForm />; // Optional: handle default case if needed
              }
            })()}
          </div>
        </>
      )}
    </div>
  );
}

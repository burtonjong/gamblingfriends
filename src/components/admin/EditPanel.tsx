"use client";

import { generateClient } from "aws-amplify/data";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { type Schema } from "@/../amplify/data/resource";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface EditPanelProps {
  formSubmitted: boolean;
  user: Schema["User"]["type"];
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

type SessionFormData = {
  sessionAttendedId: string;
  earningsThatSession: number;
  date: string;
};

export default function EditPanel({
  formSubmitted,
  user,
  setFormSubmitted,
}: EditPanelProps) {
  const client = generateClient<Schema>();
  const queryClient = useQueryClient();

  const [selectedSession, setSelectedSession] = useState<
    Schema["SessionAttended"]["type"] | null
  >(null);

  const { register, handleSubmit, reset } = useForm<SessionFormData>();

  const {
    data: sessions = [],
    isLoading,
    error,
  } = useQuery<Schema["SessionAttended"]["type"][]>({
    queryKey: ["sessionsforuser"],
    queryFn: async () => {
      const response = await client.models.SessionAttended.list({
        filter: {
          sessionAttendedId: {
            eq: user!.id,
          },
        },
      });

      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SessionFormData) => {
      await client.models.SessionAttended.update({
        id: selectedSession!.id,
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessionforuser"] });
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000); //hide the successs message after 5 seconds
    },
    onError: (error) => {
      console.error("Error creating session:", error);
    },
  });

  const onSubmit = (data: SessionFormData) => {
    mutation.mutate(data);
  };

  const handleSessionClick = (session: Schema["SessionAttended"]["type"]) => {
    setSelectedSession(session);
    reset(); // Reset the form when a new user is selected
    setFormSubmitted(false); // Reset form submitted state
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex-1">
        <h1>Select a Session</h1>
        {isLoading ? (
          <p>Loading sessions...</p>
        ) : error ? (
          <p>Error fetching sessions</p>
        ) : sessions.length === 0 ? (
          <p>No sessions found</p>
        ) : (
          <ul className="list-none p-0">
            {sessions.map((session) => {
              const formattedDate = new Date(session.date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              );

              return (
                <li
                  key={session.id}
                  onClick={() => handleSessionClick(session)}
                  className={`mb-1.25 cursor-pointer rounded border border-gray-300 p-2.5 ${
                    selectedSession && selectedSession.id === session.id
                      ? "bg-gray-200"
                      : "bg-white"
                  }`}
                >
                  <strong>{formattedDate}</strong>
                  <div>${session.earningsThatSession}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {selectedSession && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2.5 rounded border border-gray-300 bg-gray-100 p-5"
        >
          <div className="mb-2.5">
            <label>Date</label>
            <input
              type="date"
              {...register("date", { required: true })}
              defaultValue={selectedSession.date}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div className="mb-2.5">
            <label>Earnings</label>
            <input
              type="number"
              step="0.01"
              defaultValue={selectedSession?.earningsThatSession ?? ""}
              {...register("earningsThatSession", { required: true })}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <button
            type="submit"
            className={`p-2.5 ${
              formSubmitted ? "bg-green-500" : "bg-blue-600"
            } cursor-pointer rounded border-none text-white transition-colors duration-300 ease-in-out`}
          >
            {formSubmitted ? "Session Updated" : "Update Session"}
          </button>
          {formSubmitted && (
            <div className="mt-2.5 text-green-500">
              Session has been successfully updated!
            </div>
          )}
        </form>
      )}
    </div>
  );
}

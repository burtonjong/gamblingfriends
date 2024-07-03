"use client";

import { generateClient } from "aws-amplify/data";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { type Schema } from "@/../amplify/data/resource";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const client = generateClient<Schema>();

//definition of user, taken directly from Schema, used in Tanstack useQuery
type User = Schema["User"]["type"];

type SessionFormData = {
  sessionAttendedId: string;
  earningsThatSession: number;
  date: string;
};

export default function AdminForm() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<SessionFormData>();

  //to get all the users in our database
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await client.models.User.list();
      return response.data as User[];
    },
  });

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    reset(); // Reset the form when a new user is selected
    setFormSubmitted(false); // Reset form submitted state
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  //a Tanstack mutation to add Sessions to Users
  const mutation = useMutation({
    mutationFn: async (data: SessionFormData) => {
      await client.models.SessionsAttended.create({
        ...data,
        sessionAttendedId: selectedUser!.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex gap-5 p-5">
      <div className="flex-1">
        <h1>Select a User</h1>
        <input
          type="text"
          placeholder="Search for a name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="mb-2.5 w-full rounded border border-gray-300 p-2"
        />
        {isLoading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p>Error fetching users</p>
        ) : (
          <ul className="list-none p-0">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserClick(user)}
                className={`mb-1.25 cursor-pointer rounded border border-gray-300 p-2.5 ${
                  selectedUser && selectedUser.id === user.id
                    ? "bg-gray-200"
                    : "bg-white"
                }`}
              >
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
                <div>{user.email}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedUser && (
        <div className="flex-1">
          <h3>
            Add a Session for {selectedUser.firstName} {selectedUser.lastName}
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2.5 rounded border border-gray-300 bg-gray-100 p-5"
          >
            <div className="mb-2.5">
              <label>Date</label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="mb-2.5">
              <label>Earnings</label>
              <input
                type="number"
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
              {formSubmitted ? "Session Added" : "Add Session"}
            </button>
            {formSubmitted && (
              <div className="mt-2.5 text-green-500">
                Session has been successfully added!
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

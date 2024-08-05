"use client";

import { generateClient } from "aws-amplify/data";
import { useState } from "react";

import { type Schema } from "@/../amplify/data/resource";
import EditPanel from "@/components/admin/EditPanel";
import { useQuery } from "@tanstack/react-query";

const client = generateClient<Schema>();

//definition of user, taken directly from Schema, used in Tanstack useQuery
type User = Schema["User"]["type"];

export default function EditForm() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

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
    setFormSubmitted(false); // Reset form submitted state
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5 p-5">
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
            Edit a Session for {selectedUser.firstName} {selectedUser.lastName}
          </h3>
          <EditPanel
            formSubmitted={formSubmitted}
            user={selectedUser}
            setFormSubmitted={setFormSubmitted}
          />
        </div>
      )}
    </div>
  );
}

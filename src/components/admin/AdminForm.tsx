"use client";

import { generateClient } from "aws-amplify/data";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { type Schema } from "@/../amplify/data/resource";

const client = generateClient<Schema>();

//we need to assign a list of these User objects to the useState
type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  totalEarnings?: number;
  sessionsAttended: SessionAttended[];
};
//referenced by User objects
type SessionAttended = {
  id: string;
  sessionAttendedId: string;
  earningsThatSession?: number;
  date: string;
};

type SessionFormData = {
  sessionAttendedId: string;
  earningsThatSession: number;
  date: string;
};

export default function AdminForm() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { register, handleSubmit, reset } = useForm<SessionFormData>();

  //to get all the users in our database
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await client.models.User.list();
        //console.log("response from client.models.User.list(): ")
        //console.log(response)
        const userList = response.data as unknown as User[];
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    reset(); // Reset the form when a new user is selected
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const onSubmit = async (data: SessionFormData) => {
    try {
      await client.models.SessionsAttended.create({
        ...data,
        sessionAttendedId: selectedUser!.id,
      });
      // Optionally refetch users or update local state
      console.log("Session added:", data);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h1>Admin Page</h1>
        <input //the search bar
          type="text"
          placeholder="Search for a name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
              style={{ cursor: "pointer" }}
            >
              {user.firstName} {user.lastName} ({user.email}){user.role}
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div style={{ marginLeft: "20px" }}>
          <h3>
            Add Session for {selectedUser.firstName} {selectedUser.lastName}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Date</label>
              <input type="date" {...register("date", { required: true })} />
            </div>
            <div>
              <label>Earnings</label>
              <input
                type="number"
                step="0.01"
                {...register("earningsThatSession", { required: true })}
              />
            </div>
            <button type="submit">Add Session</button>
          </form>
        </div>
      )}
    </div>
  );
}

"use client";

import { generateClient } from "aws-amplify/data";
import React, { useEffect, useState } from "react";

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

export default function AdminForm() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleUserClick = (userId: string) => {
    //TODO: when click on a user, make a new form on the right to add a new SessionAttended to the person
    console.log(`User clicked: ${userId}`);
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
    <div>
      <p>Admin</p>
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
            onClick={() => handleUserClick(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.firstName} {user.lastName} ({user.email}) - Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

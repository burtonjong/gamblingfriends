"use client";

import { generateClient } from "aws-amplify/data";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { type Schema } from "@/../amplify/data/resource";

const client = generateClient<Schema>();

//we need to assign a list of these User objects to the useState
type User = Schema["User"]["type"];

type SessionFormData = {
  sessionAttendedId: string;
  earningsThatSession: number;
  date: string;
};

export default function AdminForm() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<SessionFormData>();

  //to get all the users in our database
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await client.models.User.list();
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
    setFormSubmitted(false); // Reset form submitted state
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
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000); //hide message after 5 seconds
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
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div style={{ flex: "1" }}>
        <h1>Admin Page</h1>
        <input
          type="text"
          placeholder="Search for a name"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        />
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
              style={{
                cursor: "pointer",
                padding: "10px",
                marginBottom: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor:
                  selectedUser && selectedUser.id === user.id
                    ? "#f0f0f0"
                    : "#fff",
              }}
            >
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              <div>{user.email}</div>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div style={{ flex: "1" }}>
          <h3>
            Add a Session for {selectedUser.firstName} {selectedUser.lastName}
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#fafafa",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label>Date</label>
              <input
                type="date"
                {...register("date", { required: true })}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Earnings</label>
              <input
                type="number"
                {...register("earningsThatSession", { required: true })}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: formSubmitted ? "green" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              {formSubmitted ? "Session Added" : "Add Session"}
            </button>
            {formSubmitted && (
              <div style={{ marginTop: "10px", color: "green" }}>
                Session has been successfully added!
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

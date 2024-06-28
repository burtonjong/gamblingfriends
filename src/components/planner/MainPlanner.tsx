"use client";

// import { generateClient } from "aws-amplify/data";

// import { useQuery } from "@tanstack/react-query";

// import { type Schema } from "../../../amplify/data/resource";

// const client = generateClient<Schema>();

export default function MainPlanner() {
  // const { data, isFetching } = useQuery({
  //   initialData: [] as Schema["User"]["type"][],
  //   initialDataUpdatedAt: 0,
  //   queryKey: ["Users", {}],
  //   queryFn: async () => {
  //     const response = await client.models.User.list();
  //     return response.data;
  //   },
  // });

  // console.log(data);
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex-column flex gap-2">
        {/* {isFetching ? (
          <h1>Loading,,,</h1>
        ) : (
          <>
            {data.map((user) => (
              <div
                className="flex-column flex gap-2 border border-gray-300"
                key={user.id}
              >
                <h1>{user.firstName}</h1>
                <h1>{user.lastName}</h1>
                <h1>{user.email}</h1>
                <h1>{user.id}</h1>
              </div>
            ))}
          </>
        )} */}
      </div>
    </div>
  );
}

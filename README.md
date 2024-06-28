This is a [Next.js](https://nextjs.org/) project

A preview deployment can be found at: spreadsheet-planner.vercel.app

## Note

Please don't push directly on main, create a branch and then push to that branch and create a PR when it's ready to be reviewed

```bash
git branch new-branch

git checkout new-branch

or

git checkout -b new-branch (to automatically checkout to that branch)
```

## Getting Started

First, run the development server:

```bash
npm i

then

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Examples

```
"use client";

import { generateClient } from "aws-amplify/data";

import { useQuery } from "@tanstack/react-query";

import { type Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function MainPlanner() {
  const { data, isFetching } = useQuery({
    initialData: [] as Schema["User"]["type"][],
    initialDataUpdatedAt: 0,
    queryKey: ["Users", {}],
    queryFn: async () => {
      const response = await client.models.User.list();
      return response.data;
    },
  });

  console.log(data);
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex-column flex gap-2">
        {isFetching ? (
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
        )}
      </div>
    </div>
  );
}
```

### Some notes:

- When querying data, you will most likely be in a client component. So be sure to use `"use client"` at the top of your file.

- Since we are using typescript and we want type safety, we want to be able to set an initial data (in this case an empty array) that is the type of what is being returned from the response. Remember that the "Schema" is the type of all data.

- Mutations are different and require you to create a mutation function. However this should not be too complicated.

## Documentation

Next.js documentation (used for rendering, routing, etc):

- [Next.js Documentation](https://nextjs.org/docs)

Tailwind documentation (an easier way to apply css classes):

- [Tailwind.css Documentation](https://tailwindcss.com/docs/utility-first)

TypeScript --> JavaScript transition (better and industry standard):

- [TypeScript Documentation](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

React Hook Form documentation (no need for hard form logic):

- [React Hook Form Documentation](https://react-hook-form.com/get-started)

Tanstack Query and Mutation documentation (no need for hard form logic):

- [Tanstack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/guides/queries)

- [Tanstack Mutation Documentation](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)

import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Post: a.model({
    postId: a.id(),
    title: a.string().required(),
    comments: a.hasMany('Comment', 'postId'),
    owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])])
  }).authorization(allow => [
    allow.guest().to(['read', 'create']),
    allow.owner()
  ]),
  Comment: a.model({
    postId: a.id(),
    content: a.string().required(),
    post: a.belongsTo('Post', 'postId'),
    owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])])
  }).authorization(allow => [
    allow.guest().to(['read', 'create']),
    allow.owner()
  ])
});

// const schema = a.schema({
//   Member: a.model({
//     name: a.string().required(),
//     // 1. Create a reference field
//     teamId: a.id(),
//     // 2. Create a belongsTo relationship with the reference field
//     team: a.belongsTo('Team', 'teamId'),
//   })
//     .authorization(allow => [allow.guest()]),
//
//   Team: a.model({
//     mantra: a.string().required(),
//     // 3. Create a hasMany relationship with the reference field
//     //    from the `Member`s model.
//     members: a.hasMany('Member', 'teamId'),
//   })
//     .authorization(allow => [allow.guest()]),
// });

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

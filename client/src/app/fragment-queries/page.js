import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";

const query1 = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      name
      id
      email
    }
  }
`;

const query2 = gql`
  fragment UserEmail on User {
    email
  }

  query GetUser($userId: ID!) {
    user(id: $userId) {
      ...UserEmail
    }
  }
`;

export default async function Page() {
  const { data: data1 } = await getClient().query({
    query: query1,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
    variables: {
      userId: "1",
    },
  });

  const { data: data2 } = await getClient().query({
    query: query2,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
    variables: {
      userId: "1",
    },
  });

  return (
    <main>
      <div className="text-3xl font-bold p-5">
        RSC query with fragments
      </div>
      <div className="pl-5">Name: {data1.user.name}</div>
      <div className="pl-5">Email: {data2.user.email}</div>
    </main>
  );
}

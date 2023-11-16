
import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";

const query1 = gql`
  query {
    randomNumber1
  }
`;

export default async function Bar() {
  const { data: data1 } = await getClient().query({
    query: query1,
    context: {
      fetchOptions: {},
    },
  });

  return (
    <main>
      <div className="text-3xl font-bold p-5">Bar component</div>
      <div className="pl-5">randomNumber1 query: {data1.randomNumber1}</div>
    </main>
  );
}

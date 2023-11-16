import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";

import Foo from "../../components/foo";
import Bar from "../../components/bar";

const query1 = gql`
  query {
    randomNumber1
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
  });

  return (
    <main>
      <div className="text-3xl font-bold p-5">
        RSC query deduping in children
      </div>
      <div className="pl-5">randomNumber1 query: {data1.randomNumber1}</div>
      <Foo />
      <Bar />
    </main>
  );
}

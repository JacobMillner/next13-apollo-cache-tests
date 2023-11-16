import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";

const query1 = gql`
  query {
    randomNumberSlow
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

  const { data: data2 } = await getClient().query({
    query: query1,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });

  // lets go ahead and fire another one after 1 s
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { data: data3 } = await getClient().query({
    query: query1,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });
  return (
    <main>
      <div className="text-3xl font-bold p-5">RSC Slow query deduping, showing deduping of in-flight requests</div>
      <div className="pl-5">
        randomNumberSlow query 1: {data1.randomNumberSlow}
      </div>
      <div className="pl-5">
        randomNumberSlow query 2: {data2.randomNumberSlow}
      </div>
      <div className="pl-5">
        randomNumberSlow query 3: {data3.randomNumberSlow}
      </div>
    </main>
  );
}

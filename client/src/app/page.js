// app/page.tsx
import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";
import Link from "next/link";

const query1 = gql`
  query {
    randomNumber1
  }
`;

const query2 = gql`
  query {
    randomNumber2
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
    query: query2,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });

  const { data: data3 } = await getClient().query({
    query: query2,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });

  const { data: data4 } = await getClient().query({
    query: query2,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });

  const { data: data5 } = await getClient().query({
    query: query2,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });

  return (
    <main>
      <div className="text-3xl font-bold p-5">Main Menu:</div>
      <Link href="/with-children" className="text-1xl font-bold p-2">
        With Children
      </Link>
      <Link href="/slow-query" className="text-1xl font-bold p-2">
        Slow Query
      </Link>
      <Link href="/nextjs-cache" className="text-1xl font-bold p-2">
        Next server data cache enabled
      </Link>
      <Link href="/fragment-queries" className="text-1xl font-bold p-2">
        Fragment Queries
      </Link>
      <div className="text-3xl font-bold p-5">RSC Apollo cache deduping</div>
      <div className="text-1xl font-bold p-2">Non dedupped request</div>
      <div className="pl-5">randomNumber1 query: {data1.randomNumber1}</div>
      <div className="text-1xl font-bold p-2">Dedupped requests</div>
      <div className="pl-5">randomNumber2 query 1: {data2.randomNumber2}</div>
      <div className="pl-5">randomNumber2 query 2: {data3.randomNumber2}</div>
      <div className="pl-5">randomNumber2 query 2: {data3.randomNumber2}</div>
      <div className="pl-5">randomNumber2 query 4: {data4.randomNumber2}</div>
      <div className="pl-5">randomNumber2 query 5: {data5.randomNumber2}</div>
    </main>
  );
}

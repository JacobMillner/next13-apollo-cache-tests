import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    randomNumber1: String
  }

  type Query {
    randomNumber2: String
  }

  type Query {
    randomNumberSlow: String
  }

  type Query {
    user(id: ID!): User
  }

  type User {
    id: ID
    name: String
    email: String
  }
`;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const randomNum = async () => Math.random();
const slowRandom = async () => {
  await sleep(1000);
  return Math.random();
};
const mockUser = (_, args) => {
  return { id: args.id, name: "von Neumann", email: "vonNeumann@hotmail.com" };
};

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    randomNumber1: randomNum,
    randomNumber2: randomNum,
    randomNumberSlow: slowRandom,
    user: mockUser,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    {
      requestDidStart: (requestContext) => {
        if (requestContext.request.http?.headers.has("x-apollo-tracing")) {
          return;
        }
        const query = requestContext.request.query?.replace(/\s+/g, " ").trim();
        const variables = JSON.stringify(requestContext.request.variables);
        console.log(
          new Date().toISOString(),
          `- [Request Started] { query: ${query}, variables: ${variables}, operationName: ${requestContext.request.operationName} }`
        );
        return;
      },
    },
  ],
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);

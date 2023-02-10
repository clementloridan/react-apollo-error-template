/*** APP ***/
import React from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";

import "./index.css";

const ALL_PEOPLE = gql`
  query allFilms {
    allFilms {
      films {
        id
        title
      }
    }
  }
`;

function App() {
  const { loading, data } = useQuery(ALL_PEOPLE, {
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
  });

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Movies</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {data?.allFilms?.films?.map((film) => (
            <li key={film.id}>{film.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  ssrMode: typeof window === "undefined",
  ssrForceFetchDelay: 100,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

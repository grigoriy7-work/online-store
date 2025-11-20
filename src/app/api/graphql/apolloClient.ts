import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const link = new HttpLink({
  uri: import.meta.env.VITE_API_GRAPHQL_URL,
});

export const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

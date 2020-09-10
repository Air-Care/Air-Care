import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

// Set up Apollo Client
export const client = new ApolloClient({
  uri: 'https://immense-escarpment-33083.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});
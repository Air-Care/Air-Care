import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FireMap from './Fire-Map';
import AirQuality from './AirQuality';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

// set up Apollo Client
const client = new ApolloClient({
  uri: 'https://aqueous-sands-05141.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

// set up query constant
const QUERY = gql`
  {
    greeting(name: "Kevin") {
      salutation
    }
  }
`;

// query function
function Query() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.log('loading', loading, 'error', error, 'data', data);
    return <Text>Error :(</Text>;
  }
  return <Text>{JSON.stringify(data)}</Text>;
}

// App Component 
export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>
          <Query />
        </Text>
        <Text>To get started, edit App.js</Text>
      </View>
    </ApolloProvider>
  );
}

// Style Sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

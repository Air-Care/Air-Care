import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import Navigator from './Navigator';

// set up Apollo Client
const client = new ApolloClient({
  uri: 'https://aqueous-sands-05141.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});



// App Component 
export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Navigator/>
      </View>
    </ApolloProvider>
  );
}

// Style Sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    
  },
});

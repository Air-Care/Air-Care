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



// App Component 
export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <AirQuality num={0}/>
       
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

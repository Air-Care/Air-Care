import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import FireMap from './Fire-Map';
import AirQuality from './AirQuality'
import Navigator from './Navigator';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  makeVar
} from '@apollo/client';

// set up Apollo Client
const client = new ApolloClient({
  uri: 'https://immense-escarpment-33083.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

 export const latLong: any = makeVar([])

// App Component 
export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [savedCoord, setSavedCoord] = useState(0)
  
  useEffect(() => {
    async function getLocationAsync() {
      // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setSavedCoord(Math.floor(location.coords.latitude));
        console.log(latitude);
        console.log(longitude);
        console.log(savedCoord)
        latLong([location.coords.latitude, location.coords.longitude])
      } else {
        throw new Error('Location permission not granted');
      }
    }
    
    getLocationAsync();
  }, [savedCoord])

  console.log('LatLong',latLong())
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

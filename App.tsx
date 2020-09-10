import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import FireMap from './Fire-Map';
import AirQuality from './AirQuality';
import Navigator from './Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animation from './animation'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  makeVar,
} from '@apollo/client';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    tabBarOptions={{
      labelStyle: { fontSize: 18 },
      activeTintColor: 'darkgrey',
      style: { backgroundColor: 'white' }
    }}>
      <Tab.Screen name="Air" component={AirQuality} />
      <Tab.Screen name="Fire" component={FireMap} />
    </Tab.Navigator>
  );
}
// set up Apollo Client
const client = new ApolloClient({
  uri: 'https://immense-escarpment-33083.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export const latLong: any = makeVar([]);

// App Component
export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [savedCoord, setSavedCoord] = useState(0);

  useEffect(() => {
    async function getLocationAsync() {
      try {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setSavedCoord(Math.floor(location.coords.latitude));
          console.log(latitude);
          console.log(longitude);
          console.log(savedCoord);
          latLong([location.coords.latitude, location.coords.longitude]);
        } else {
          throw new Error('Location permission not granted');
        }
      } catch(err) {
        console.error(err)
      }
    }

    getLocationAsync();
  }, [savedCoord]);

  console.log('LatLong', latLong());
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
        {/* <Animation/> */}
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


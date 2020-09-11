import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';

import { TabBar } from './components/TabBar';
import { appStyles } from './utils/style';
import { client } from './utils/store';
import { Coord } from './utils/types';

export default function App() {
  const [userLocation, setUserLocation] = useState<Coord>({latitude: 34.0522, longitude: -118.2437})

  // Get location permission only on initial render
  useEffect(() => {
    async function getLocationAsync() {
      try {
        // permissions returns only for location permissions on iOS and under certain conditions
        // see Permissions.LOCATION
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setUserLocation({ latitude, longitude })
        } else {
          // Debugging logs
          throw new Error('Location permission not granted');
        }
      } catch(err) {
        console.error(err)
      }
    }

    getLocationAsync();
  }, []);

  return (
    <ApolloProvider client={client}>
      <View style={appStyles.container}>
        <NavigationContainer>
          <TabBar userLocation={userLocation} />
        </NavigationContainer>
      </View>
    </ApolloProvider>
  );
}

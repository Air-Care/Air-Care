import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AirQuality } from './AirQuality';
import { FireMap } from './Fire-Map';
import { Coord } from '../utils/types';

export const TabBar = ({ userLocation }: {userLocation: Coord}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator 
    tabBarOptions={{
      labelStyle: { fontSize: 18 },
      activeTintColor: 'darkgrey',
      style: { backgroundColor: 'white' }
    }}>
      <Tab.Screen name="Air" children={() => <AirQuality userLocation={userLocation} />} />
      <Tab.Screen name="Fire" children={() => <FireMap userLocation={userLocation} />} />
    </Tab.Navigator>
  );
}
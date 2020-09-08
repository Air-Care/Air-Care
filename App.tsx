import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AirQuality from './AirQuality';

export default function App() {
  const [airQuality, setAirQuality] = useState('');

  const testLocation: any = {
    latitude: 34.0522,
    longitude: 118.2437,
  };

  const query = `
    query {
      Location(id: ${testLocation}){
        airQuality
      }
    }
  `;

  const url = 'graphQL enpoints';

  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  };

  fetch(url, opts)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data) {
        setAirQuality(data);
      } else {
        console.log('Cannon Retrieve Air Quality Data');
      }
    });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <AirQuality num={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

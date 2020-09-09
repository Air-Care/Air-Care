import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FireMap from './Fire-Map';
import AirQuality from './AirQuality'


export default function App() {
  const [airQuality, setAirQuality] = useState('');

  const testLocation: any = {
    latitude: 34.0522,
    longitude: 118.2437,
  };

  const query = `
    {
      greeting (name:"Kevin"){
        salutation
      }
    }
  `;

  const url = 'https://evening-waters-26376.herokuapp.com/graphql';

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
        setAirQuality(JSON.stringify(data));
      } else {
        console.log('Cannon Retrieve Air Quality Data');
      }
    });

  return (
    <View style={styles.container}>
      <Text>{airQuality}</Text>
      {/* <FireMap/> */}
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



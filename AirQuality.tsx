import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';

const colors: Array<string> = [
  'rgba(0,30,255, 0.9)',
  'rgba(0, 221, 255, 0.9)',
  'rgba(255, 220, 0, 0.9)',
  'rgba(237, 124, 19, 0.9)',
  'rgba(255, 25, 0, 0.9)',
  'rgba(181, 5, 32, 0.9)'
];

// set up query constant
const QUERY = gql`
  {
    report (latitude: 140, longitude : 32) {
      fires 
      aqi
    }
  }
`;

// query function
function Query() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (error) return <Text style={styles.text}>{JSON.stringify(error)}Error :(</Text>;

  return <Text style={styles.text}>{JSON.stringify(data)}</Text>;
}

const AirQuality = () => {
  const num = 0;

  let x: number = num;
  let y: number;

  y = colors[x + 1] ? x + 1 : x - 1;

  return (
    <View style={styles.container}>

      <LinearGradient
        // Background Linear Gradient
        colors={[colors[x], colors[y]]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
        }}
      />
      <Query />
      <Text style={styles.text}>Air Quality</Text>
    </View>
  );
};

export default AirQuality;

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
    fontSize: 18,
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';

const colors: Array<string> = [
 
  'rgba(255, 25, 0, 0.9)',
  'rgba(237, 124, 19, 0.9)',
  'rgba(255, 220, 0, 0.9)',
  'rgba(59, 217, 180, 0.9)',
  'rgba(0, 187, 255, 0.9)',
  'rgba(60,0,255, 0.9)',
 
];

const quality: Array<string> = [
  'Hazardous',
  'Unhealthy',
  'Moderate',
  'Good',
  'Excellent',
 
  
 
]

// set up query constant
const QUERY = gql`
  {
    report (latitude: 34.0522, longitude :  118.2437) {  
      aqi
    }
  }
`;

let aqi: number;
// query function
function Query() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (error) return <Text style={styles.text}>{JSON.stringify(error)}Error :(</Text>;

   aqi = data.report.aqi
  return <Text style={styles.text}>AQI : {aqi}</Text>;
}

const AirQuality = () => {
 let x = 0;
 x = Math.floor(9/20);
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
      <Text>{x}</Text>
      <Text style={styles.text}>{quality[x]} Air Quality</Text>
      <Query />
      
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

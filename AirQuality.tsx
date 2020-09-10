import React, { FunctionComponent } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';

type CoordProps = {
	lat: number,
	long: number
}

const AirQuality: FunctionComponent<CoordProps> = ({lat, long}) => {
  
  const colors: Array<string> = [
    'rgba(255, 25, 0, 0.9)',
    'rgba(237, 124, 19, 0.9)',
    'rgba(255, 220, 0, 0.9)',
    'rgba(59, 217, 180, 0.9)',
    'rgba(0, 187, 255, 0.9)',
    'rgba(60,0,255, 0.9)',
    'rgba(60,0,255, 0.9)'
  ];

  const quality: Array<string> = [
    'Hazardous',
    'Unhealthy',
    'Moderate',
    'Good',
    'Excellent',
    'Determining Air Quality'
  ];

  // set up query constant
  const QUERY = gql`
  {
    report (latitude: ${lat}, longitude :  ${long}) {  
      aqi
    }
  }
`;

  let aqi: number = 101;
  // query function
  function Query() {
    const { loading, error, data } = useQuery(QUERY);
    if (loading) return <Text style={styles.text}>Loading...</Text>;
    if (error) return <Text style={styles.text}>{JSON.stringify(error)}</Text>;
    aqi = data.report.aqi;
    return;
  }
  Query();

  let x: number = Math.floor(aqi / 20);
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
      <Text style={styles.text}>{quality[x]} Air Quality</Text>
       <Text></Text>
      <Text style={styles.text}>AQI : {aqi}</Text>
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

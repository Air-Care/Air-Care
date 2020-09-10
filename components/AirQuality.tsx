import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import { airQualityStyles} from '../utils/style';
import { Coord } from '../utils/types';

const { container, text, gradient } = airQualityStyles;

const colors: Array<string> = [
  'rgba(255, 25, 0, 0.9)',
  'rgba(237, 124, 19, 0.9)',
  'rgba(255, 220, 0, 0.9)',
  'rgba(59, 217, 180, 0.9)',
  'rgba(0, 187, 255, 0.9)',
  'rgba(60,0,255, 0.9)',
  'rgba(60,0,255, 0.9)',
];

const quality: Array<string> = [
  'Hazardous',
  'Unhealthy',
  'Moderate',
  'Good',
  'Excellent',
  'Determing',
];

const GET_AQI = gql`
query AQI($latitude: Float, $longitude: Float) {
  report(latitude: $latitude, longitude : $longitude) {  
    aqi
  }
}
`

export const AirQuality = ({ userLocation }: {userLocation: Coord}) => {
  const { latitude, longitude } = userLocation;

  const { loading, error, data } = useQuery(GET_AQI, {
    variables: { latitude, longitude }
  });

  const aqi = data ? data.report.aqi : 101;
  let x: number = Math.floor(aqi / 20);
  let y: number = x + 1 < colors.length ? x + 1 : x - 1;

  return (
    <View style={container}>
      <LinearGradient
        // Background color gradient
        colors={[colors[x], colors[y]]}
        style={gradient}
      />
      { loading
        ? <Text style={text}>{'Loading...'}</Text>
        : <>
            <Text style={text}>
              {quality[x]} Air Quality
            </Text>
            <Text>
              {/* empty linebreak in app view */}
            </Text>
            <Text style={text}>
              AQI : {error ? 'loading error' : aqi}
            </Text>
          </>
      }
    </View>
  );
};

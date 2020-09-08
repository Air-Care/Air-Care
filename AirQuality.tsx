import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const colors: Array<string> = [
  'rgba(0,30,255, 0.9)',
  'rgba(0, 221, 255, 0.9)',
  'rgba(255, 220, 0, 0.9)',
  'rgba(237, 124, 19, 0.9)',
  'rgba(255, 25, 0, 0.9)',
];

const AirQuality = (props: any) => {
const {num} = props;

let x: number = num;
let y: number;

y = colors[x + 1] ? x + 1 : x - 1;

  return (
    <>
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

      <Text
        style={{
          backgroundColor: 'transparent',
          fontSize: 18,
          color: '#fff',
        }}
      >
        ______ Air Quality
      </Text>
    </>
  );
}

export default AirQuality;

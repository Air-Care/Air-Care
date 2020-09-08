import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const colors: Array<string> = [
  'rgba(0,30,255, 0.9)',
  'rgba(0, 221, 255, 0.9)',
  'rgba(255, 220, 0, 0.9)',
  'rgba(237, 124, 19, 0.9)',
  'rgba(255, 25, 0, 0.9)',
];

let x: number = 3;
let y: number;

y = colors[x + 1] ? x + 1 : x - 1;

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
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

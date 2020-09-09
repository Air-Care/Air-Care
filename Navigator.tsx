import React from 'react-native'
import Swiper from 'react-native-swiper'
import FireMap from './Fire-Map';
import Map from './AirQuality';
import SwipeNavigator from 'react-native-swipe-navigation'
import { StyleSheet, Text, View } from 'react-native';



const Navigator = SwipeNavigator({
  Map: {
    screen: Map,
    
    right: 'FireMap',
   
  },

  FireMap: {
    screen:FireMap,
    type: 'place', // push is the default type
  },

 
})

export default Navigator
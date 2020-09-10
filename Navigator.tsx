import FireMap from './Fire-Map';
import AirQuality from './AirQuality';
import React from 'react'
import {
  View,
  Screen,
  Text,
  StyleSheet
} from 'react-native'
import Swiper from 'react-native-swiper'
import SwipeNavigator from 'react-native-swipe-navigation';

const Navigator = SwipeNavigator({
  AirQuality: {
    screen: AirQuality,

    right: 'FireMap',
  },

  FireMap: {
    screen: FireMap,
    
  },
});


export default Navigator;


import FireMap from './Fire-Map';
import AirQuality from './AirQuality';
import SwipeNavigator from 'react-native-swipe-navigation';

const Navigator = SwipeNavigator({
  AirQuality: {
    screen: AirQuality,

    right: 'FireMap',
  },

  FireMap: {
    screen: FireMap,
    left: 'AirQuality',
  },
});

export default Navigator;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AirQuality from './AirQuality'
import FireMap from './Fire-Map'



export default function MyTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Air" component={AirQuality} />
      <Tab.Screen name="Fire" component={FireMap} />
    </Tab.Navigator>
  );
}
import React from 'react';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';



const FireMap: React.FC = () => {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);

	async function getLocationAsync() {
		// permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === 'granted') {
			let location = await Location.getCurrentPositionAsync({});
			console.log(location.coords.latitude);
			console.log(location.coords.longitude);
			setLatitude(location.coords.latitude);
			setLongitude(location.coords.longitude);
		} else {
			throw new Error('Location permission not granted');
		}
	}
	
	getLocationAsync();

	return (
		<View style={styles.container}>
			<MapView
			style={styles.mapStyle}
			region={{
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
			/>
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default FireMap;
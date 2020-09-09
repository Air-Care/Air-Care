
import React, { FunctionComponent } from 'react';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import { gql, useQuery } from '@apollo/client';

type CoordProps = {
	latitude: number,
	longitude: number
}

const FireMap: FunctionComponent<CoordProps> = ({latitude, longitude}) => {

	// let firesArray = [];

	// const QUERY = gql`
  // {
  //   reports(latitude: latitude, longitude: longitude) {
  //     fire
	// 		aqi
  //   }
  // }
	// `;

	// function Query() {
	// 	const { loading, error, data } = useQuery(QUERY);

	// 	if (loading) return <Text style={styles.text}>Loading...</Text>;
	// 	if (error) return <Text style={styles.text}>Error :</Text>;

	// 	firesArray = data.report.fires;
	// 	console.log(firesArray)
	// }

	// Query();


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
			// onMapReady={() => {
			// 	this.mapRef.fitToCoordinates()
			// }}
			>
			<Marker
			coordinate={{
				latitude: latitude,
				longitude: longitude,
			}}
      description={"This is your current location"}
      >
			<View style={styles.currentLocationWrap}>
				<View style={styles.currentLocationRing} />
				<View style={styles.currentLocation} />
			</View>
			</Marker>
			<Marker
			coordinate={{
				latitude: 34.2535129895,
				longitude: -117.9370215097,
			}}
			description={"This is a marker in React Natve"}
      >
			<View style={styles.fireWrap}>
				<View style={styles.fireRing} />
				<View style={styles.fire} />
			</View>
			</Marker>
			<Marker
			coordinate={{
				latitude: 34.2863373684,
				longitude: -117.8866046053,
			}}
      description={"This is a marker in React Natve"}
      >
			<View style={styles.fireWrap}>
				<View style={styles.fireRing} />
				<View style={styles.fire} />
			</View>
			</Marker>
			</MapView>
		</View>
	);
}

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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
	},
	currentLocation: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#1D8DFD'
	},
	currentLocationWrap: {
    alignItems: "center",
    justifyContent: "center",
	},
	currentLocationRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#7FB7EF",
    position: "absolute",
    borderWidth: 1,
    borderColor: "#013FD8",
	},
	fire: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#EA2121'
	},
	fireWrap: {
    alignItems: "center",
    justifyContent: "center",
	},
	fireRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF8080",
    position: "absolute",
    borderWidth: 1,
    borderColor: "#FF6666",
  },
});

export default FireMap;
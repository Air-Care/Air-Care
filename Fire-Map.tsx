import React, { FunctionComponent, useRef, useEffect } from 'react';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { latLong } from './App';

const FireMap: FunctionComponent = () => {
  const locationData: any = latLong();
  const lat: number = locationData[0];
  const long: number = locationData[1];

  let firesArray: any[] = [];
  let allCoords: any[] = [{latitude: lat, longitude: long}];

  (function FireRetriever(latitude: number, longitude: number) {
    const GET_FIRES = gql`
      query Fire($latitude: Float, $longitude: Float) {
        report(latitude: $latitude, longitude: $longitude) {
          fires {
            latitude
            longitude
						updateTime
          }
        }
      }
    `;
		const { loading, error, data } = useQuery(GET_FIRES, {
			variables: {latitude, longitude}
		});
		if (loading) return <Text style={styles.text}>Loading...</Text>;
		if (error) return <Text style={styles.text}>Error :</Text>;
		if (data.report.fires.length < 1) {
			Alert.alert(
				'No fires in your area',
				'Whew!',
				[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
				{ cancelable: false }
			);
		}
		// console.log('this is the fires array: ', data.report.fires)
    firesArray = data.report.fires;
  })(lat, long);
  
  const getLastUpdated = (lastUpdated: String) => {
    let d = new Date();
    let convertedDate = d.getUTCDate();
    let convertedTime = d.getUTCHours();

    let dateSliced = parseInt(lastUpdated.slice(8, 10));
    let timeSliced = parseInt(lastUpdated.slice(11, 13));

    // if date is different
    if (convertedDate - dateSliced === 1) return 24 - timeSliced + convertedTime;
    else if (convertedDate - dateSliced > 1) {
      let days = convertedDate - dateSliced
      let timeDiff = 24 - timeSliced + convertedTime
      return `${days} days and ${timeDiff}`
    }

    // if date is the same
    return convertedTime - timeSliced;
  }

	let mapRef = useRef(null);

	useEffect(() => {
		mapRef.current.fitToCoordinates(allCoords, { edgePadding: {
			top: 75,
			right: 75,
			bottom: 75,
			left: 75
    }});
  })

	return (
		<View style={styles.container}>
			<MapView
			ref={mapRef}
			style={styles.mapStyle}
			region={{
				latitude: lat,
				longitude: long,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
			>
			<Marker
				coordinate={{
					latitude: lat,
					longitude: long,
				}}
				description={'This is your current location'}
			>
				<View style={styles.currentLocationWrap}>
					<View style={styles.currentLocationRing} />
					<View style={styles.currentLocation} />
				</View>
			</Marker>
			{firesArray.map((obj, index) => {
        allCoords.push({latitude: obj.latitude, longitude: obj.longitude});
				return (
					<Marker
						key={obj.latitude}
						coordinate={{
							latitude: obj.latitude,
							longitude: obj.longitude,
						}}
						description={`Last updated ${getLastUpdated(obj.updateTime)} hours ago`}
						>
						<View style={styles.fireWrap}>
							<View style={styles.fireRing} />
							<View style={styles.fire} />
            </View>
					</Marker>
				)
			})}
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
    backgroundColor: '#1D8DFD',
  },
  currentLocationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocationRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#7FB7EF',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#013FD8',
  },
  fire: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EA2121',
  },
  fireWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF8080',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#FF6666',
  },
});

export default FireMap;

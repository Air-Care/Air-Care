import React, { useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Alert } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { fireStyles } from '../utils/style';
import { Coord } from '../utils/types';

const {
  container,
  mapStyle, 
  currentLocation, 
  currentLocationWrap,
  currentLocationRing,
  fire,
  fireWrap,
  fireRing
} = fireStyles;

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

export const FireMap = ({ userLocation }: {userLocation: Coord}) => {
  const { latitude, longitude } = userLocation;
  const mapRef = useRef<any>(null);
  let allCoords = [{latitude, longitude}];

  // Retrieve fires with GraphQL query on pageload
  const { error, data } = useQuery(GET_FIRES, {
    variables: {latitude, longitude}
  });

  if (error) Alert.alert('Error loading fires');
  if (data) {
    const { fires } = data.report;
    if (fires.length < 1) {
      Alert.alert(
        'No fires in your area.',
        'Whew!',
      );
    }
    allCoords = allCoords.concat(fires)
  }


  // Re-fit the map view when allCoords changes
  useEffect(() => {
    mapRef.current.fitToCoordinates(allCoords, { edgePadding: {
      top: 75,
      right: 75,
      bottom: 75,
      left: 75
    }})
  });

  return (
    <View style={container}>
      <MapView
      ref={mapRef}
      style={mapStyle}
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          description={'This is your current location'}
        >
          <View style={currentLocationWrap}>
            <View style={currentLocationRing} />
            <View style={currentLocation} />
          </View>
        </Marker>
        {/* !! The map params shadow latitude / longitude vars !! */}
        {data && data.report.fires.map(
          ({ latitude, longitude, updateTime }: {latitude: number, longitude: number, updateTime: string}) => (
            <Marker
              key={`${latitude}-${longitude}`}
              coordinate={{ latitude, longitude }}
              description={`Last updated ${getLastUpdated(updateTime)} hours ago`}
            >
              <View style={fireWrap}>
                <View style={fireRing} />
                <View style={fire} />
              </View>
            </Marker>
          )
        )}
      </MapView>
    </View>
  );
}

import { StyleSheet, Dimensions } from 'react-native';

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const airQualityStyles = StyleSheet.create({
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  }
});

export const fireStyles = StyleSheet.create({
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
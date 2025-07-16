import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Coordinates, WeatherDataArray } from '../types';
import { EARTH_RADIUS_KILOMETER } from './constants';

/**
 * Requests location permissions from the user for both iOS and Android platforms.
 * Uses Geolocation for iOS and PermissionsAndroid for Android.
 *
 * @returns {Promise<void>} A promise that resolves when permissions are handled.
 */
export const requestPermissions = async () => {
  if (Platform.OS === 'ios') {
    await Geolocation.requestAuthorization('whenInUse');
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
};

/**
 * Calculates the distance in kilometers between two geographic coordinates using the Haversine formula.
 *
 * @param currentLocation - The user's location (latitude and longitude).
 * @param cityLocation - The destination location (latitude and longitude).
 * @returns {number} The distance in kilometers between the two points.
 */
export const calculateDistance = (currentLocation: Coordinates, cityLocation: Coordinates): number => {
  const dLat = (cityLocation.lat - currentLocation.lat) * Math.PI / 180;
  const dLon = (cityLocation.lng - currentLocation.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(currentLocation.lat * Math.PI / 180) * Math.cos(cityLocation.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KILOMETER * c;
};

/**
 * Groups weather forecast data by day and extracts summary information for each day.
 *
 * @param data - An array of weather forecast items, each containing a 'dt_txt' property and weather details.
 * @returns An array of objects, each representing a day's summary with date, temperature, weather, description, and icon.
 */
export const groupWeatherByDay = (data: any[]): WeatherDataArray => {
  const grouped: { [date: string]: any[] } = {};

  data.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  return Object.entries(grouped).map(([date, items]) => {
    const noonItem = items.find(i => i.dt_txt.includes("12:00:00")) || items[0];
    return {
      date,
      temp: noonItem.main.temp,
      weather: noonItem.weather[0].main,
      description: noonItem.weather[0].description,
      icon: noonItem.weather[0].icon
    };
  });
};

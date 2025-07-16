import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Coordinates } from '../types';
import { requestPermissions } from '../utils/global.utils';
import { Alert } from 'react-native';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    const requestPermissionAndGetLocation = async () => {
      try {
        await requestPermissions();

        Geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err) => {
            Alert.alert(
              "Location Error",
              err.message,
              [{ text: "OK" }]
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            forceRequestLocation: true,
          }
        );
      } catch (err: any) {
        console.log("Error requesting location permissions:", err);
      }
    };

    requestPermissionAndGetLocation();
  }, []);

  return location;
};

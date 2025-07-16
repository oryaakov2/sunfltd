import { StatusBar, useColorScheme } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { City, Coordinates, Units } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CityDetails from './screens/CityDetails';

export type RootStackParamList = {
  Home: { location: Coordinates };
  CityDetails: { city: City, unit: Units };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CityDetails" component={CityDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

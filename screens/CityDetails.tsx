import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { memo } from 'react';
import Weather from '../components/Weather';
import { SCREEN_WIDTH } from '../utils/constants';
import colors from '../utils/colors';

const CityDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CityDetails'>>();
  const { city, unit } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: city.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{city.name}</Text>
        <Text style={styles.subtitle}>{city.country}</Text>
        <Text style={styles.description}>{city.description}</Text>
      </View>
      <Weather city={city} unit={unit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  image: {
    width: SCREEN_WIDTH,
    height: 300,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  weatherContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  weatherTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.gray900,
  },
  weatherList: {
    paddingHorizontal: 4,
  },
  weatherCard: {
    backgroundColor: colors.gray100,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    minWidth: 120,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separator: {
    width: 12,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray800,
    marginBottom: 8,
    textAlign: "center",
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  tempText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.gray900,
    marginBottom: 4,
  },
  weatherText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray700,
    marginBottom: 2,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 10,
    color: colors.gray600,
    textAlign: "center",
    textTransform: "capitalize",
  },
  loadingText: {
    textAlign: "center",
    color: colors.gray700,
    fontStyle: "italic",
  },
  errorText: {
    textAlign: "center",
    color: colors.red,
    fontStyle: "italic",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray500,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.gray900,
  },
});

export default memo(CityDetails);
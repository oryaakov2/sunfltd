import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useFetchWeather } from "../hooks/useFetchWeather";
import { City, Units, WeatherData } from "../types";
import { formatDate } from "../utils/date.utils";
import { FC } from "react";
import { SCREEN_WIDTH, WEATHER_BASE_URL } from "../utils/constants";
import colors from '../utils/colors';

interface WeatherProps {
  city: City;
  unit: Units;
};

const Weather: FC<WeatherProps> = ({ city, unit }) => {

  const { weatherData, isLoading, error } = useFetchWeather(city.coords, unit);

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#007AFF" />
    )
  }
  if (error) {
    return (
      <Text style={styles.errorText}>{error}</Text>
    );
  }

  const renderWeatherCard = ({ item }: { item: WeatherData }) => (
    <View style={styles.weatherCard}>
      <Text style={styles.dayText}>{formatDate(item.date)}</Text>
      <Image
        source={{ uri: `${WEATHER_BASE_URL}/img/w/${item.icon}.png` }}
        style={styles.weatherIcon}
      />
      <Text style={styles.tempText}>{Math.round(item.temp)}°</Text>
      <Text style={styles.weatherText}>{item.weather}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.weatherTitle}>
        {weatherData.length}-Day Weather Forecast
      </Text>
      <FlatList
        data={weatherData}
        renderItem={renderWeatherCard}
        keyExtractor={(item) => item.date}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weatherList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={styles.loadingText}>No weather data available</Text>
        )}
      />
    </View>
  );
}

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
    fontSize: 16,
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

export default Weather;
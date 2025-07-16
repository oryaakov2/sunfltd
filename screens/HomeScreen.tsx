import { StyleSheet, SafeAreaView, View } from "react-native";
import CityList from "../components/CityList";
import { City, SearchQuery, Units } from "../types";
import { useMemo, useState } from "react";
import SearchInput from "../components/inputs/SearchInput";
import ContinentInput from "../components/inputs/ContinentInput";
import { cities } from "../mockdata/mockdata";
import SelectorButton from "../components/buttons/SelectorButton";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { calculateDistance } from "../utils/global.utils";
import colors from '../utils/colors';

const HomeScreen = () => {

  const location = useCurrentLocation();

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    name: '',
    continent: ''
  });

  const [sortBy, setSortBy] = useState<"Name" | "Distance">("Name");
  const [unit, setUnit] = useState<Units>('C');

  const citiesWithDistance = useMemo(() => {
    return cities.map(city => {
      let distance = 0;
      if (location?.lat && location?.lng) {
        distance = calculateDistance(
          location,
          city.coords,
        );
      }
      return { ...city, distance };
    });
  }, [location]);

  const filteredCities = useMemo(() => {
    return citiesWithDistance.filter((city: City) => {
      // Exclude inactive cities
      if (!city.active) {
        return false;
      }
      const name = city.name.toLowerCase();
      const country = city.country.toLowerCase();
      const continent = city.continent.toLowerCase();

      const matchCitiesByNameOrCountry = name.includes(searchQuery.name.toLowerCase()) ||
        country.includes(searchQuery.name.toLowerCase());
      const matchCitiesByContinent = continent.includes(searchQuery.continent.toLowerCase());

      return matchCitiesByNameOrCountry && matchCitiesByContinent;
    });
  }, [citiesWithDistance, searchQuery.name, searchQuery.continent]);

  const sortCities = useMemo(() => {
    return [...filteredCities].sort((a, b) => {
      if (sortBy === "Distance") return a.distance - b.distance;
      return a.name.localeCompare(b.name);
    });
  }, [filteredCities, sortBy]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <SearchInput
          label='Search'
          placeholder='Type to search'
          value={searchQuery.name}
          onChangeText={setSearchQuery}
        />
        <ContinentInput
          label='Continent'
          value={searchQuery.continent}
          onChangeText={setSearchQuery}
        />
        <View style={styles.selectorContainer}>
          <SelectorButton
            label="Sort by"
            options={["Name", "Distance"]}
            selected={sortBy}
            onSelect={(val) => setSortBy(val as "Name" | "Distance")}
          />
          <SelectorButton
            label="Units"
            options={['C', 'F']}
            selected={unit}
            onSelect={(val) => setUnit(val as 'C' | 'F')}
          />
        </View>
      </View>
      <CityList data={sortCities} unit={unit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    backgroundColor: colors.white,
  },
  inputContainer: {
    marginVertical: 8,
    padding: 16,
    gap: 15,
  },
  selectorContainer: {
    flexDirection: 'row',
    gap: 30,
  }
});

export default HomeScreen;
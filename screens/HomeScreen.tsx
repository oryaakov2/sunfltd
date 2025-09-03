import { StyleSheet, SafeAreaView, View } from "react-native";
import SwipeableCityStack from "../components/SwipeableCityStack";
import { City, SearchQuery, Units } from "../types";
import { useEffect, useMemo, useState } from "react";
import SearchInput from "../components/inputs/SearchInput";
import ContinentInput from "../components/inputs/ContinentInput";
import { cities } from "../mockdata/mockdata";
import SelectorButton from "../components/buttons/SelectorButton";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { calculateDistance } from "../utils/global.utils";
import colors from '../utils/colors';
import CityList from "../components/CityList";

const HomeScreen = () => {
  const location = useCurrentLocation();

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    name: '',
    continent: ''
  });

  const [sortBy, setSortBy] = useState<"Name" | "Distance">("Name");
  const [unit, setUnit] = useState<Units>('C');
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const [cityState, setCityState] = useState<City[]>(() => cities.map(c => ({ ...c })));

  useEffect(() => {
    setCityState(prev => prev.map(city => {
      let distance = 0;
      if (location?.lat && location?.lng) {
        distance = calculateDistance(location, city.coords);
      }
      return { ...city, distance } as City;
    }));

  }, [location]);

  const filteredCities = useMemo(() => {
    return cityState.filter((city: City) => {
      if (!city.active) return false;
      if (showFavorites && !city.favorite) return false;
      if (!showFavorites && city.favorite) return false;

      const name = city.name.toLowerCase();
      const country = city.country.toLowerCase();
      const continent = city.continent.toLowerCase();

      const matchCitiesByNameOrCountry = name.includes(searchQuery.name.toLowerCase()) ||
        country.includes(searchQuery.name.toLowerCase());
      const matchCitiesByContinent = continent.includes(searchQuery.continent.toLowerCase());

      return matchCitiesByNameOrCountry && matchCitiesByContinent;
    });
  }, [cityState, searchQuery.name, searchQuery.continent, showFavorites]);

  const sortCities = useMemo(() => {
    return [...filteredCities].sort((a, b) => {
      if (sortBy === "Distance") return (a.distance ?? 0) - (b.distance ?? 0);
      return a.name.localeCompare(b.name);
    });
  }, [filteredCities, sortBy]);

  const handleCityFavorited = (city: City) => {
    setCityState(prev => prev.map(c => c.name === city.name ? { ...c, favorite: true } : c));
  };

  const handleCityRemoved = (city: City) => {
    setCityState(prev => prev.map(c => c.name === city.name ? { ...c, active: false } : c));
  };

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
            <SelectorButton
              label="Show"
              options={['All', 'Favorites']}
              selected={showFavorites ? 'Favorites' : 'All'}
              onSelect={(val) => setShowFavorites(val === 'Favorites')}
            />
          </View>
        </View>

        {showFavorites ? (
          <CityList data={sortCities} unit={unit} />
        ) : (
          <SwipeableCityStack
            cities={sortCities}
            unit={unit}
            onCityFavorited={handleCityFavorited}
            onCityRemoved={handleCityRemoved}
          />
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  inputContainer: {
    padding: 16,
    gap: 15,
    backgroundColor: colors.white,
  },
  selectorContainer: {
    flexDirection: 'row',
    gap: 30,
  }
});

export default HomeScreen;
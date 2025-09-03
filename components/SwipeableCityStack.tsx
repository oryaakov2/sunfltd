import React, { FC, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SwipeableCard from './SwipeableCard';
import { City, Units } from '../types';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/constants';
import colors from '../utils/colors';

interface Props {
  cities: City[];
  unit: Units;
  onCityRemoved?: (city: City) => void;
  onCityFavorited?: (city: City) => void;
}

const SwipeableCityStack: FC<Props> = ({
  cities,
  unit,
  onCityRemoved,
  onCityFavorited,
}) => {
  const handleSwipeLeft = useCallback((city: City) => {
    onCityRemoved?.(city);
  }, [onCityRemoved]);

  const handleSwipeRight = useCallback((city: City) => {
    onCityFavorited?.(city);
  }, [onCityFavorited]);

  if (cities.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No more cities to explore!</Text>
        <Text style={styles.emptySubText}>
          Try adjusting your filters to see more cities.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardStack}>
        {cities.slice(0, 3).map((city, index) => (
          <SwipeableCard
            key={city.name}
            city={city}
            unit={unit}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            index={index}
            totalCards={Math.min(cities.length, 3)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
  },
  cardStack: {
    width: SCREEN_WIDTH - 64,
    height: SCREEN_HEIGHT * 0.52,
    position: 'relative',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: colors.gray700,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default SwipeableCityStack;
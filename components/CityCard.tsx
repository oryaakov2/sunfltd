import { FC } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { City, Units } from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { SCREEN_WIDTH } from "../utils/constants";
import colors from '../utils/colors';

interface Props {
  city: City;
  unit: Units;
}

const cardWidth = (SCREEN_WIDTH - 40) / 2;

const CityCard: FC<Props> = ({ city, unit }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate("CityDetails", { city, unit });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={styles.card}
    >
      <Image source={{ uri: city.image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.countryName}>{city.country}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {city.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.overlay,
    padding: 12,
  },
  cityName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  countryName: {
    color: colors.white,
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 6,
  },
  description: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.8,
  },
});

export default CityCard;
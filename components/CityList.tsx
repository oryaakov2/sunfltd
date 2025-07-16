import { FC, memo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { City, Units } from "../types";
import CityCard from "./CityCard";

interface Props {
  data: City[];
  unit: Units;
}

const CityList: FC<Props> = ({ data, unit }) => {

  const renderCity = ({ item }: { item: City }) => (
    <CityCard city={item} unit={unit} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderCity}
      keyExtractor={(item, index) => `${item.name}`}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <Text style={styles.noResultsText}>No results found</Text>}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  noResultsText: {
    textAlign: 'center',
  },
});

export default memo(CityList);
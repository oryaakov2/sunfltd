import { FC, useCallback, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { InputProps, SearchQuery } from "../../types";
import { continents } from "../../mockdata/mockdata";
import colors from '../../utils/colors';

const ContinentInput: FC<InputProps> = ({ value, onChangeText, label }) => {
  const [picklistVisible, setPicklistVisible] = useState<boolean>(false);

  const handleSelect = (selectedValue: string) => {
    onChangeText((prevState: SearchQuery) => ({
      ...prevState,
      continent: selectedValue
    }));
    setPicklistVisible(false);
  };

  const getInputValue = useCallback(() => {
    const selected = continents.find(continent => continent.value === value);
    return selected ? selected.label : continents[0].label;
  }, [value]);

  const renderContinentItem = useMemo(() => {
    return ({ item }: { item: typeof continents[0] }) => (
      <TouchableOpacity
        style={[
          styles.picklistItem,
          item.value === value && styles.selectedItem
        ]}
        onPress={() => handleSelect(item.value)}
      >
        <Text style={[
          styles.picklistItemText,
          item.value === value && styles.selectedItemText
        ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    )
  }, [value]);

  return (
    <View>
      {label && (
        <Text style={{ marginBottom: 8, fontSize: 16 }}>{label}</Text>
      )}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setPicklistVisible(!picklistVisible)}
      >
        <Text style={[styles.inputText]}>
          {getInputValue()}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
      {picklistVisible && (
        <View style={styles.picklistContainer}>
          <FlatList
            data={continents}
            renderItem={renderContinentItem}
            keyExtractor={(item) => item.value}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
  },
  placeholderText: {
    color: colors.gray500,
  },
  arrow: {
    fontSize: 13,
    color: colors.gray500,
  },
  picklistContainer: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    zIndex: 9999,
    borderColor: colors.gray300,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 300,
    overflow: 'hidden',
  },
  picklistItem: {
    padding: 16,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
    borderBottomColor: colors.gray400,
  },
  selectedItem: {
    backgroundColor: colors.blueLight,
  },
  picklistItemText: {
    fontSize: 16,
    color: colors.black,
  },
  selectedItemText: {
    color: colors.blueDark,
    fontWeight: '600',
  },
});

export default ContinentInput;
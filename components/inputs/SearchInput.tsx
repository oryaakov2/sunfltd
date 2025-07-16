import { FC } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { InputProps, SearchQuery } from "../../types";
import colors from '../../utils/colors';

const SearchInput: FC<InputProps> = ({ placeholder, value, onChangeText, label }) => {

  const handleChangeText = (text: string) => {
    onChangeText((prevState: SearchQuery) => ({
      ...prevState,
      name: text
    }));
  };

  return (
    <View>
      {label && (
        <Text style={{ marginBottom: 8, fontSize: 16 }}>{label}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        clearButtonMode="while-editing"
        onChangeText={handleChangeText}
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.white,
  },
});

export default SearchInput;
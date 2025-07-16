import React, { FC, memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from '../../utils/colors';

type SelectorButtonProps = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
};

const SelectorButton: FC<SelectorButtonProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.options}>
        {options.map((option, index) => (
          <React.Fragment key={option}>
            <TouchableOpacity onPress={() => onSelect(option)}>
              <Text
                style={[
                  styles.optionText,
                  selected === option && styles.activeOptionText,
                ]}
              >
                {label === 'Units' && '°' + option || option}
              </Text>
            </TouchableOpacity>
            {index < options.length - 1 && (
              <Text style={styles.separator}>|</Text>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 8,
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionText: {
    fontSize: 18,
    color: colors.gray900,
  },
  activeOptionText: {
    textDecorationLine: "underline",
  },
  separator: {
    marginHorizontal: 6,
    color: colors.gray500,
  },
});


export default memo(SelectorButton);
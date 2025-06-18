/* eslint-disable react-native/no-inline-styles */
import { View, TextInput, TouchableOpacity } from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import gobalTheme from "../../styles/theme";
import styles from "./styles";

export const InputSearch = ({
  searchQuery,
  setSearchQuery,
  placeholder,
  style,
}: InputSearchProps) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <Icons name="search" size={20} color={gobalTheme.secondaryText.color} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={gobalTheme.secondaryText.color}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={() => setSearchQuery("")}>
        <Icons
          name="close-sharp"
          size={20}
          color={gobalTheme.secondaryText.color}
          style={{ opacity: searchQuery ? 1 : 0 }}
        />
      </TouchableOpacity>
    </View>
  );
};

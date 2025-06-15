import { View, TextInput } from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import gobalTheme from "../../styles/theme";
import styles from "./styles";

export const InputSearch = ({
  searchQuery,
  setSearchQuery,
  placeholder,
}: InputSearchProps) => {
  return (
    <View style={styles.searchContainer}>
      <Icons name="search" size={20} color={gobalTheme.secondaryText.color} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={gobalTheme.secondaryText.color}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

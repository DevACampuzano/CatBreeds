/* eslint-disable react-native/no-inline-styles */
import { View, TextInput, TouchableOpacity } from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import useStyles from "./styles";
import { useThemeStore } from "../../common/store";

export const InputSearch = ({
  searchQuery,
  setSearchQuery,
  placeholder,
  style,
}: InputSearchProps) => {
  const { colors } = useThemeStore();
  const styles = useStyles(colors);

  return (
    <View style={[styles.searchContainer, style]}>
      <Icons name="search" size={20} color={colors.textSecondary} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={() => setSearchQuery("")}>
        <Icons
          name="close-sharp"
          size={20}
          color={colors.textSecondary}
          style={{ opacity: searchQuery ? 1 : 0 }}
        />
      </TouchableOpacity>
    </View>
  );
};

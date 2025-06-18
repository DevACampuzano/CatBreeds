import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import gobalTheme from "../../styles/theme";
import styles from "./styles";

export const Header = ({ title, onBackPress }: IHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={gobalTheme.primary.color}
      />
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.buttonBack}
        activeOpacity={0.8}
      >
        <Icons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.box} />
    </View>
  );
};

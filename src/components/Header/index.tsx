import {
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStyles from "./styles";
import { useThemeStore } from "../../common/store/";
import Icon from "@react-native-vector-icons/ionicons";
import logo_catbreeeds from "../../common/assets/img/logo_catbreeeds_1.png";

export const Header = ({ title, logo, onBackPress, style }: IHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors, toggleTheme } = useThemeStore();
  const styles = useStyles(colors, isDarkMode);

  return (
    <View
      style={[
        styles.header,
        { paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 5 },
        style,
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {onBackPress && (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.buttonBack}
          activeOpacity={0.8}
        >
          <Icons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}
      {logo && (
        <View style={styles.logoContainer}>
          <Image
            source={logo_catbreeeds}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      )}
      {title && <Text style={styles.headerTitle}>{title}</Text>}

      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        <Icon name={isDarkMode ? "sunny" : "moon"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

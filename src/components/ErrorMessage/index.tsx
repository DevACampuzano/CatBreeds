import { Image, StyleSheet, Text, View } from "react-native";
import gobalTheme from "../../styles/theme";
import logo_catbreeeds from "../../common/assets/img/logo_catbreeeds.png";

export const ErrorMessage = ({
  text,
  subtitle,
}: {
  text: string;
  subtitle?: string;
}) => (
  <View style={styles.container}>
    <Image source={logo_catbreeeds} style={styles.logo} resizeMode="contain" />
    <Text style={styles.text}>{text}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 140,
    height: 100,
  },
  text: {
    color: gobalTheme.secondaryText.color,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  subtitle: {
    color: gobalTheme.secondaryText.color,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "Roboto",
  },
});

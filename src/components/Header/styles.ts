import { StyleSheet } from "react-native";

const styles = (colors: Colors, isDarkMode: boolean) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: "Roboto-Bold",
      fontWeight: "bold",
      color: "white",
      flex: 1,
      textAlign: "center",
    },
    box: {
      width: 30,
    },
    buttonBack: {
      padding: 5,
    },
    themeToggle: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(255,255,255,0.2)",
    },
    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      width: 120,
      height: 80,
      tintColor: isDarkMode ? colors.primary : "white",
    },
  });

export default styles;

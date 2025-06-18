import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean, colors: Colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    listContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    search: {
      marginHorizontal: 20,
      marginVertical: 20,
    },
    themeToggle: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(255,255,255,0.2)",
    },
    header: {
      backgroundColor: colors.headerBackground,
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

export default styles;

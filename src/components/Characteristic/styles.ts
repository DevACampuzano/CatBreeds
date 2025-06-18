import { StyleSheet } from "react-native";

const styles = (colors: Colors) =>
  StyleSheet.create({
    characteristicRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 5,
    },
    characteristicLabel: {
      fontFamily: "Roboto",
      fontSize: 16,
      color: colors.textSecondary,
      flex: 1,
      textAlign: "center",
    },
    starsContainer: {
      flexDirection: "row",
    },
  });

export default styles;

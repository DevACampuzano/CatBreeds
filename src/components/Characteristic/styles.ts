import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  characteristicRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  characteristicLabel: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#6c757d",
    flex: 1,
  },
  starsContainer: {
    flexDirection: "row",
  },
});

export default styles;

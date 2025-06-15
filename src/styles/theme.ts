import { StyleSheet } from "react-native";

const gobalTheme = StyleSheet.create({
  container: {
    flex: 1,
  },
  primary: {
    color: "#5e3b89",
  },
  accent: {
    color: "#9F78DC",
  },
  secondaryText: {
    color: "#6c757d",
  },
  header: {
    backgroundColor: "#5e3b89",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default gobalTheme;

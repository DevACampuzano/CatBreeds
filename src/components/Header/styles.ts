import { StyleSheet } from "react-native";
import gobalTheme from "../../styles/theme";

const styles = StyleSheet.create({
  header: {
    backgroundColor: gobalTheme.primary.color,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});

export default styles;

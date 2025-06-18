import { Platform, StyleSheet } from "react-native";
import gobalTheme from "../../styles/theme";

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "stretch",
    height: 250,
    marginBottom: 15,
    position: "relative",
    backgroundColor: gobalTheme.container.backgroundColor,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  catImage: {
    width: "50%",
    height: "100%",
    backgroundColor: gobalTheme.primary.color,
  },
  basicInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  catName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5e3b89",
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
  },
  vs: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -18 }, { translateY: -18 }],
    color: gobalTheme.primary.color,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: Platform.OS === "ios" ? 2 : 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 24,
    fontWeight: "bold",
    zIndex: 1,
    textAlign: "center",
    overflow: "hidden",
  },
});

export default styles;

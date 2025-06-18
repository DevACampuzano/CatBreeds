import { Platform, StyleSheet } from "react-native";

const styles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    imageContainer: {
      alignItems: "center",
      height: 250,
      marginBottom: 15,
      position: "relative",
      backgroundColor: colors.background,
      justifyContent: "center",
      flexDirection: "row",
    },
    catImage: {
      width: "50%",
      height: "100%",
      backgroundColor: colors.primary,
    },
    basicInfo: {
      alignItems: "center",
      marginBottom: 20,
    },
    catName: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
      fontFamily: "Roboto-Bold",
      marginBottom: 10,
    },
    vs: {
      position: "absolute",
      color: colors.primary,
      backgroundColor: `${colors.surface}CC`,
      borderRadius: 50,
      padding: 10,
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
    btnClear: {
      position: "absolute",
      color: colors.primary,
      backgroundColor: `${colors.surface}CC`, // Opacidad ~80%
      borderRadius: 50,
      right: 10,
      top: 10,
      padding: 10,
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

import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean, colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    favoriteButton: {
      position: "absolute",
      zIndex: 1,
      backgroundColor: colors.surface,
      borderRadius: 50,
      padding: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    imageContainer: {
      alignItems: "center",
      height: 400,
      marginBottom: 15,
      position: "relative",
      backgroundColor: colors.surface,
    },
    catImage: {
      width: "100%",
      height: "100%",
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      backgroundColor: "#f0f0f0",
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
    origin: {
      fontSize: 18,
      color: colors.textSecondary,
      fontFamily: "Roboto",
      marginLeft: 8,
    },
    description: {
      fontSize: 16,
      fontFamily: "Roboto",
      color: colors.text,
      lineHeight: 24,
    },
    temperamentContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    temperamentTag: {
      backgroundColor: colors.accent,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    temperamentText: {
      color: "white",
      fontSize: 14,
      fontFamily: "Roboto",
      fontWeight: "500",
    },
    infoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 5,
    },
    infoLabel: {
      fontSize: 16,
      color: colors.textSecondary,
      fontFamily: "Roboto",
    },
    infoValue: {
      fontSize: 16,
      fontFamily: "Roboto",
      fontWeight: "600",
      color: colors.text,
    },
  });
export default styles;

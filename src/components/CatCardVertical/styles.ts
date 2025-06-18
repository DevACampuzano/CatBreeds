import { StyleSheet } from "react-native";
const styles = (isDarkMode: boolean, colors: Colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    catImage: {
      width: "100%",
      height: 100,
      borderRadius: 12,
      backgroundColor: "#f0f0f0",
    },
    cardContent: {
      flex: 1,
      marginLeft: 15,
    },
    catName: {
      fontFamily: "Roboto-Bold",
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 5,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    origin: {
      fontFamily: "Roboto",
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 5,
    },
  });

export const useStylesSkeleton = (isDarkMode: boolean) =>
  StyleSheet.create({
    skeletonCard: {
      opacity: 0.9,
    },
    skeletonImage: {
      backgroundColor: isDarkMode ? "#4a4949" : "#e1e1e1",
      overflow: "hidden",
      position: "relative",
    },
    shimmerOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
  });

export default styles;

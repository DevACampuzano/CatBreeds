import { StyleSheet } from "react-native";
const styles = (isDarkMode: boolean, colors: Colors) =>
  StyleSheet.create({
    card: {
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: colors.cardBackground,
    },
    catImage: {
      width: 80,
      height: 80,
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
    intelligenceRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    intelligenceLabel: {
      fontFamily: "Roboto",
      fontSize: 14,
      color: colors.textSecondary,
      marginRight: 8,
    },
    starsContainer: {
      flexDirection: "row",
    },
  });

export const useStylesSkeleton = (isDarkMode: boolean) =>
  StyleSheet.create({
    skeletonCard: {
      opacity: 0.9,
    },
    skeletonImage: {
      backgroundColor: isDarkMode ? "#4a4949" : "#f0f0f0",
      overflow: "hidden",
      position: "relative",
    },
    skeletonTextContainer: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: isDarkMode ? "#4a4949" : "#f0f0f0",
      height: 16,
      marginBottom: 5,
    },
    skeletonText: {
      height: "100%",
      backgroundColor: isDarkMode ? "#4a4949" : "#f0f0f0",
    },
    skeletonIcon: {
      backgroundColor: isDarkMode ? "#4a4949" : "#f0f0f0",
      borderRadius: 12,
    },
    skeletonStar: {
      width: 14,
      height: 14,
      backgroundColor: isDarkMode ? "#4a4949" : "#f0f0f0",
      borderRadius: 7,
      marginRight: 2,
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

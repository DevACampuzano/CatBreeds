import { StyleSheet } from "react-native";

const useStyles = (colors: Colors) =>
  StyleSheet.create({
    section: {
      backgroundColor: colors.surface,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: "Roboto-Bold",
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 15,
      textAlignVertical: "center",
    },
  });

export default useStyles;

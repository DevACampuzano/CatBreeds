import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#5e3b89",
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
  imageContainer: {
    alignItems: "center",
    height: 400,
    marginBottom: 15,
  },
  catImage: {
    width: "100%",
    height: "100%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  basicInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  catName: {
    fontSize: 28,
    height: 28,
    fontWeight: "bold",
    color: "#5e3b89",
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
  },
  origin: {
    fontSize: 18,
    color: "#6c757d",
    fontFamily: "Roboto",
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#333",
    lineHeight: 24,
  },
  temperamentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  temperamentTag: {
    backgroundColor: "#9F78DC",
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
    color: "#6c757d",
    fontFamily: "Roboto",
  },
  infoValue: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "600",
    color: "#333",
  },
});
export default styles;

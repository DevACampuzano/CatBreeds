import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
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
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: "#5e3b89",
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
    color: "#6c757d",
    marginLeft: 5,
  },
  intelligenceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  intelligenceLabel: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#6c757d",
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: "row",
  },
});

export const stylesSkeleton = StyleSheet.create({
  skeletonCard: {
    opacity: 0.9,
  },
  skeletonImage: {
    backgroundColor: "#e1e1e1",
    overflow: "hidden",
    position: "relative",
  },
  skeletonTextContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#e1e1e1",
    height: 16,
    marginBottom: 5,
  },
  skeletonText: {
    height: "100%",
    backgroundColor: "#e1e1e1",
  },
  skeletonIcon: {
    backgroundColor: "#e1e1e1",
    borderRadius: 12,
  },
  skeletonStar: {
    width: 14,
    height: 14,
    backgroundColor: "#e1e1e1",
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

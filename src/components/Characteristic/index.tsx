import { StyleSheet, Text, View } from "react-native";
import { Stars } from "../Stars";

export const Characteristic = ({
  label,
  value = 0,
}: {
  label: string;
  value?: number;
}) => (
  <View style={styles.characteristicRow}>
    <Text style={styles.characteristicLabel}>{label}</Text>
    <View style={styles.starsContainer}>
      <Stars rating={value} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  characteristicRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  characteristicLabel: {
    fontSize: 16,
    color: "#6c757d",
    flex: 1,
  },
  starsContainer: {
    flexDirection: "row",
  },
});

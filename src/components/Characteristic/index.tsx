import { Text, View } from "react-native";
import { Stars } from "../Stars";
import styles from "./styles";

export const Characteristic = ({
  label,
  value = 0,
  style,
}: ICharacteristicProps) => (
  <View style={[styles.characteristicRow, style]}>
    <Text style={styles.characteristicLabel}>{label}</Text>
    <View style={styles.starsContainer}>
      <Stars rating={value} />
    </View>
  </View>
);

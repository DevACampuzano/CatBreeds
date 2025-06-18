import { Text, View } from "react-native";
import { Stars } from "../Stars";
import useStyles from "./styles";
import { useThemeStore } from "../../common/store";

export const Characteristic = ({
  label,
  value = 0,
  style,
}: ICharacteristicProps) => {
  const { colors } = useThemeStore();
  const styles = useStyles(colors);
  return (
    <View style={[styles.characteristicRow, style]}>
      <Text style={styles.characteristicLabel}>{label}</Text>
      <View style={styles.starsContainer}>
        <Stars rating={value} />
      </View>
    </View>
  );
};

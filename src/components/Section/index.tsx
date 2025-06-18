import { Text } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useThemeStore } from "../../common/store";
import useStyles from "./styles";

export const Section = ({
  title,
  children,
  index,
  animateDuration = 300,
}: SectionProps) => {
  const { colors } = useThemeStore();
  const styles = useStyles(colors);
  return (
    <Animated.View
      style={styles.section}
      entering={FadeInDown.delay(animateDuration * index)}
    >
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </Animated.View>
  );
};

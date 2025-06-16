import { Text, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
interface SectionProps {
  title: string;
  children?: React.ReactNode;
  index: number;
}
export const Section = ({ title, children, index }: SectionProps) => {
  return (
    <Animated.View
      style={styles.section}
      entering={FadeInDown.delay(300 * index)}
    >
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: "white",
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
    height: 20,
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    color: "#5e3b89",
    marginBottom: 15,
    textAlignVertical: "center",
  },
});

import { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import useStyles, { useStylesSkeleton } from "./styles";
import { useThemeStore } from "../../common/store";
const SkeletonLoaderVertical = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const { colors, isDarkMode } = useThemeStore();
  const styles = useStyles(isDarkMode, colors);
  const stylesSkeleton = useStylesSkeleton(isDarkMode);
  useEffect(() => {
    const animate = () => {
      shimmerAnim.setValue(0);
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate());
    };
    animate();

    return () => shimmerAnim.stopAnimation();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={[styles.card, stylesSkeleton.skeletonCard]}>
      <View style={[styles.catImage, stylesSkeleton.skeletonImage]}>
        <Animated.View
          style={[
            stylesSkeleton.shimmerOverlay,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
    </View>
  );
};

export default SkeletonLoaderVertical;

/* eslint-disable react-native/no-inline-styles */
import { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import styles, { stylesSkeleton } from "./styles";
const SkeletonLoader = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

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

      <View style={styles.cardContent}>
        <View style={stylesSkeleton.skeletonTextContainer}>
          <View style={[stylesSkeleton.skeletonText, { width: "60%" }]} />
          <Animated.View
            style={[
              stylesSkeleton.shimmerOverlay,
              { transform: [{ translateX }] },
            ]}
          />
        </View>

        <View style={[styles.infoRow, { marginBottom: 8, gap: 5 }]}>
          <View
            style={[stylesSkeleton.skeletonIcon, { width: 16, height: 16 }]}
          />
          <View style={[stylesSkeleton.skeletonTextContainer, { flex: 1 }]}>
            <View
              style={[
                stylesSkeleton.skeletonText,
                { width: "40%", marginLeft: 5 },
              ]}
            />
            <Animated.View
              style={[
                stylesSkeleton.shimmerOverlay,
                { transform: [{ translateX }] },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SkeletonLoader;

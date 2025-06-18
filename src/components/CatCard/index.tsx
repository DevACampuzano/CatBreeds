/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, View } from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import useStyles from "./styles";
import { Stars } from "../Stars";
import logo_catbreeeds from "../../common/assets/img/logo_catbreeeds.png";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import { BreedsActions } from "../../service";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useThemeStore } from "../../common/store";

export const CatCard = ({ item, onPress, index }: CatCardProps) => {
  const { colors, isDarkMode } = useThemeStore();
  const styles = useStyles(isDarkMode, colors);
  const { data: image, isLoading } = useQuery({
    queryKey: ["breeds-image", item.reference_image_id],
    queryFn: ({ signal }) =>
      BreedsActions.getImageById(item.reference_image_id, signal),
    enabled: !!item.reference_image_id,
    staleTime: 1000 * 60 * 60,
  });
  const scale = useSharedValue(false);

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      scale.value = true;
    })
    .onFinalize(() => {
      scale.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(scale.value ? 1.7 : 1, { duration: 200 }) },
    ],
  }));

  return (
    <Animated.View
      entering={index < 6 ? FadeInDown.delay(200 * index) : undefined}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(item, image?.url)}
        activeOpacity={0.8}
      >
        <GestureHandlerRootView style={{ zIndex: 100 }}>
          <GestureDetector gesture={longPressGesture}>
            <Animated.Image
              source={isLoading ? logo_catbreeeds : { uri: image?.url }}
              style={[styles.catImage, animatedStyle]}
              sharedTransitionTag={item.reference_image_id}
            />
          </GestureDetector>
        </GestureHandlerRootView>
        <View style={styles.cardContent}>
          <Text style={styles.catName}>{item.name}</Text>
          <View style={styles.infoRow}>
            <Icons
              name="location-outline"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={styles.origin}>{item.origin}</Text>
          </View>
          <View style={styles.intelligenceRow}>
            <Text style={styles.intelligenceLabel}>Intelligence:</Text>
            <View style={styles.starsContainer}>
              <Stars rating={item.intelligence} />
            </View>
          </View>
        </View>
        <Icons name="chevron-forward" size={24} color={colors.accent} />
      </TouchableOpacity>
    </Animated.View>
  );
};

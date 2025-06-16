import { Text, TouchableOpacity, View } from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import styles from "./styles";
import gobalTheme from "../../styles/theme";
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

export const CatCard = ({ item, navigation, index }: CatCardProps) => {
  const { data: image, isLoading } = useQuery({
    queryKey: ["breeds-image", item.reference_image_id],
    queryFn: ({ signal }) =>
      BreedsActions.getImageById(item.reference_image_id, signal),
    enabled: !!item.reference_image_id,
    staleTime: 1000 * 60 * 60,
  });
  const scale = useSharedValue(1);

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      scale.value = withTiming(1.7, { duration: 200 });
    })
    .onFinalize(() => {
      scale.value = withTiming(1, { duration: 200 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    zIndex: 10,
  }));

  return (
    <Animated.View
      entering={index < 6 ? FadeInDown.delay(200 * index) : undefined}
      style={{ zIndex: 1 }}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("Details", {
            id: item.id,
            uri: image?.url ?? "",
            reference_image_id: item.reference_image_id,
          });
        }}
        activeOpacity={0.8}
      >
        <GestureHandlerRootView style={{}}>
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
              color={gobalTheme.secondaryText.color}
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
        <Icons
          name="chevron-forward"
          size={24}
          color={gobalTheme.accent.color}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

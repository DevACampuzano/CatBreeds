import { useQuery } from "@tanstack/react-query";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
// local imports
import useStyles from "./styles";

import logo_catbreeeds from "../../common/assets/img/logo_catbreeeds.png";
import { BreedsActions } from "../../service";
import { useThemeStore } from "../../common/store";

export const CatCardVertical = ({
  item,
  onPress,
}: Omit<CatCardProps, "index">) => {
  const { colors, isDarkMode } = useThemeStore();
  const styles = useStyles(isDarkMode, colors);
  const { data: image, isLoading } = useQuery({
    queryKey: ["breeds-image", item.reference_image_id],
    queryFn: ({ signal }) =>
      BreedsActions.getImageById(item.reference_image_id, signal),
    enabled: !!item.reference_image_id,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item, image?.url)}
      activeOpacity={0.8}
    >
      <Image
        source={isLoading ? logo_catbreeeds : { uri: image?.url }}
        style={[styles.catImage]}
        // resizeMethod="resize"
        resizeMode="stretch"
      />
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
      </View>
    </TouchableOpacity>
  );
};

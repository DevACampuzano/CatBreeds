import { Image, Text, TouchableOpacity, View } from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import styles from "./styles";
import gobalTheme from "../../styles/theme";
import { Stars } from "../Stars";
import { theCatApi } from "../../common/api";
import { useEffect, useState } from "react";

export const CatCard = ({
  item,
  onPress,
}: {
  item: {
    reference_image_id: string;
    name: string;
    origin: string;
    intelligence: number;
  };
  onPress: (uri: string) => void;
}) => {
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    const getImage = async () => {
      const img = await theCatApi
        .get(`/images/${item.reference_image_id}`)
        .then((res) => {
          return res.data.url;
        });
      setImage(img);
    };
    getImage();
  }, [item.reference_image_id]);
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(image)}>
      {!image ? (
        <Image
          source={require("../../common/assets/logo_catbreeeds.png")}
          style={styles.catImage}
        />
      ) : (
        <Image source={{ uri: image }} style={styles.catImage} />
      )}

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
          <Text style={styles.intelligenceLabel}>Inteligencia:</Text>
          <View style={styles.starsContainer}>{Stars(item.intelligence)}</View>
        </View>
      </View>
      <Icons name="chevron-forward" size={24} color={gobalTheme.accent.color} />
    </TouchableOpacity>
  );
};

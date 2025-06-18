/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
//local imports
import useStyles from "./styles";
import { Section } from "../../components/Section/index";
import { Characteristic, ErrorMessage, Header } from "../../components";
import placeholderUrl from "../../common/assets/img/logo_catbreeeds.png";
import { useFavoriteStore, useThemeStore } from "../../common/store";
import { useEffect, useState } from "react";
import { useBreed } from "../../common/hooks";

type Props = NativeStackScreenProps<AppStackParamList, "Details">;

export const Details = ({ route }: Props) => {
  const { id, uri, reference_image_id } = route.params;
  const navigation = useNavigation<AppNavigationProp>();
  const [isFavorite, setIsFavorite] = useState(false);
  const { colors, isDarkMode } = useThemeStore();
  const styles = useStyles(isDarkMode, colors);
  const { data, isLoading } = useBreed(id);
  const favorite = useFavoriteStore((state) => state.favorites);
  const handleAddFavorite = useFavoriteStore((state) => state.addFavorite);
  const handleRemoveFavorite = useFavoriteStore(
    (state) => state.removeFavorite
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFavorite(id);
    } else {
      handleAddFavorite(id);
    }
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    const isFav = favorite.some((fav) => fav === id);
    setIsFavorite(isFav);
  }, [favorite, id]);

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data) {
    return <ErrorMessage text="No results found" />;
  }

  return (
    <View style={styles.container}>
      <Header title={data.name} onBackPress={() => navigation.goBack()} />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={[styles.favoriteButton, [{ top: 10, right: 10 }]]}
          activeOpacity={0.8}
          onPress={toggleFavorite}
        >
          <Icons
            name={isFavorite ? "heart" : "heart-outline"}
            size={25}
            color={colors.accent}
          />
        </TouchableOpacity>
        <Animated.Image
          source={uri ? { uri: uri } : placeholderUrl}
          style={styles.catImage}
          sharedTransitionTag={reference_image_id}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={[styles.favoriteButton, { bottom: 10, right: 10 }]}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Compare", { id, uri, reference_image_id })
          }
        >
          <Icons name="add-outline" size={25} color={colors.accent} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 20,
          }}
        >
          <Animated.View
            style={styles.basicInfo}
            entering={FadeInDown.delay(300)}
          >
            <Text style={styles.catName}>{data.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icons name="location" size={20} color={colors.accent} />
              <Text style={styles.origin}>{data.origin}</Text>
            </View>
          </Animated.View>

          <Section title="Description" index={1}>
            <Text style={styles.description}>{data.description}</Text>
          </Section>
          <Section title="Temper" index={2}>
            <View style={styles.temperamentContainer}>
              {data.temperament.split(", ").map((trait, index) => (
                <View key={index} style={styles.temperamentTag}>
                  <Text style={styles.temperamentText}>{trait}</Text>
                </View>
              ))}
            </View>
          </Section>
          <Section title="General Information" index={3}>
            <View style={{ gap: 12 }}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Life expectancy</Text>
                <Text style={styles.infoValue}>{data.life_span} years</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Metric</Text>
                <Text style={styles.infoValue}>{data.weight.metric} kg</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Hypoallergenic</Text>
                <Text style={styles.infoValue}>
                  {data.hypoallergenic ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          </Section>

          <Section title="Characteristics" index={4}>
            <View style={{ gap: 15 }}>
              <Characteristic label="Adaptability" value={data.adaptability} />
              <Characteristic
                label="Affection Level"
                value={data.affection_level}
              />
              <Characteristic
                label="Child Friendly"
                value={data.child_friendly}
              />
              <Characteristic label="Dog Friendly" value={data.dog_friendly} />
              <Characteristic label="Energy Level" value={data.energy_level} />
              <Characteristic label="Grooming" value={data?.grooming} />
              <Characteristic
                label="Health Issues"
                value={data.health_issues}
              />
              <Characteristic label="Intelligence" value={data.intelligence} />
              <Characteristic
                label="Shedding Level"
                value={data.shedding_level}
              />
              <Characteristic label="Social Needs" value={data.social_needs} />
              <Characteristic
                label="Stranger Friendly"
                value={data.stranger_friendly}
              />
              <Characteristic label="Vocalisation" value={data.vocalisation} />
            </View>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
};

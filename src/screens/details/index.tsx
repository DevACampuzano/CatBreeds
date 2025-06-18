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
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<AppStackParamList, "Details">;

export const Details = ({ route }: Props) => {
  const { id, uri, reference_image_id } = route.params;
  const navigation = useNavigation<AppNavigationProp>();
  const [isFavorite, setIsFavorite] = useState(false);
  const { colors, isDarkMode } = useThemeStore();
  const styles = useStyles(isDarkMode, colors);
  const { data, isLoading } = useBreed(id);
  const { t } = useTranslation();
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
    return <ErrorMessage text={t("error.not-found")} />;
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

          <Section title={t("details.description")} index={1}>
            <Text style={styles.description}>{data.description}</Text>
          </Section>
          <Section title={t("details.temper")} index={2}>
            <View style={styles.temperamentContainer}>
              {data.temperament.split(", ").map((trait, index) => (
                <View key={index} style={styles.temperamentTag}>
                  <Text style={styles.temperamentText}>{trait}</Text>
                </View>
              ))}
            </View>
          </Section>
          <Section title={t("details.general-info")} index={3}>
            <View style={{ gap: 12 }}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>
                  {t("details.life-expectancy")}
                </Text>
                <Text style={styles.infoValue}>{data.life_span} years</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>{t("details.metric")}</Text>
                <Text style={styles.infoValue}>{data.weight.metric} kg</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>
                  {t("details.Hypoallergenic")}
                </Text>
                <Text style={styles.infoValue}>
                  {data.hypoallergenic ? t("yes") : t("no")}
                </Text>
              </View>
            </View>
          </Section>

          <Section title={t("details.characteristics")} index={4}>
            <View style={{ gap: 15 }}>
              <Characteristic
                label={t("details.characteristics-details.adaptability")}
                value={data.adaptability}
              />
              <Characteristic
                label={t("details.characteristics-details.affection-level")}
                value={data.affection_level}
              />
              <Characteristic
                label={t("details.characteristics-details.child-friendly")}
                value={data.child_friendly}
              />
              <Characteristic
                label={t("details.characteristics-details.dog-friendly")}
                value={data.dog_friendly}
              />
              <Characteristic
                label={t("details.characteristics-details.energy-level")}
                value={data.energy_level}
              />
              <Characteristic
                label={t("details.characteristics-details.grooming")}
                value={data?.grooming}
              />
              <Characteristic
                label={t("details.characteristics-details.health-issues")}
                value={data.health_issues}
              />
              <Characteristic
                label={t("details.characteristics-details.intelligence")}
                value={data.intelligence}
              />
              <Characteristic
                label={t("details.characteristics-details.shedding-level")}
                value={data.shedding_level}
              />
              <Characteristic
                label={t("details.characteristics-details.social-needs")}
                value={data.social_needs}
              />
              <Characteristic
                label={t("details.characteristics-details.stranger-friendly")}
                value={data.stranger_friendly}
              />
              <Characteristic
                label={t("details.characteristics-details.vocalisation")}
                value={data.vocalisation}
              />
            </View>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
};

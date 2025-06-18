/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Platform,
  Image,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Animated from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
//local imports
import {
  CatCardVertical,
  Characteristic,
  ErrorMessage,
  Header,
  InputSearch,
  Section,
} from "../../components";
import useStyles from "./styles";
import { useEffect, useState } from "react";
import { BreedsActions } from "../../service";
import { useBreed, useSearchBreeds } from "../../common/hooks";
import placeholderUrl from "../../common/assets/img/logo_catbreeeds.png";
import SkeletonLoaderVertical from "../../components/CatCardVertical/Loading";
import { useThemeStore } from "../../common/store";
import { TouchableOpacity } from "react-native";
import Icon from "@react-native-vector-icons/ionicons";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<AppStackParamList, "Compare">;
export const Compare = ({ route, navigation }: Props) => {
  const { id, reference_image_id, uri } = route.params;
  const { data, isLoading } = useBreed(id);
  const [secondCat, setSecondCat] = useState<CatBreed | null>(null);
  const {
    searchQuery,
    handleChangeSearchText,
    isLoadingFiltered,
    listFiltered,
  } = useSearchBreeds();
  const { colors } = useThemeStore();
  const styles = useStyles(colors);
  const { t } = useTranslation();

  const { data: image, refetch } = useQuery({
    queryKey: ["breeds-image", secondCat?.reference_image_id],
    queryFn: ({ signal }) =>
      BreedsActions.getImageById(secondCat!.reference_image_id, signal),
    enabled: !!secondCat?.reference_image_id,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (secondCat) {
      refetch();
      Keyboard.dismiss();
    }
  }, [secondCat, refetch]);

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
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Header
              title={`${data.name} vs ${
                secondCat ? secondCat?.name : searchQuery
              }`}
              onBackPress={() => navigation.goBack()}
            />
            <View style={styles.imageContainer}>
              <Animated.Image
                source={{ uri: uri }}
                style={[styles.catImage, { borderBottomLeftRadius: 20 }]}
                sharedTransitionTag={reference_image_id}
                defaultSource={placeholderUrl}
                resizeMode="cover"
              />
              <Text style={styles.vs}>VS</Text>
              <Image
                source={secondCat ? { uri: image?.url } : placeholderUrl}
                style={[
                  styles.catImage,
                  {
                    borderBottomRightRadius: 20,
                  },
                ]}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.btnClear}
                onPress={() => {
                  setSecondCat(null);
                  handleChangeSearchText("");
                }}
              >
                <Icon name="close" size={24} color={colors.accent} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <ScrollView
          style={[styles.container]}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingVertical: 15,
                gap: 10,
              }}
            >
              <View style={{ width: "50%" }}>
                <Section
                  title={t("compare.characteristics")}
                  index={4}
                  animateDuration={100}
                >
                  <View style={{ gap: 15 }}>
                    <Characteristic
                      label={t("compare.characteristics-details.adaptability")}
                      value={data.adaptability}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t(
                        "compare.characteristics-details.affection-level"
                      )}
                      value={data.affection_level}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t(
                        "compare.characteristics-details.child-friendly"
                      )}
                      value={data.child_friendly}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t("compare.characteristics-details.dog-friendly")}
                      value={data.dog_friendly}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t("compare.characteristics-details.energy-level")}
                      value={data.energy_level}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t("compare.characteristics-details.grooming")}
                      value={data?.grooming}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t("compare.characteristics-details.health-issues")}
                      value={data.health_issues}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t("compare.characteristics-details.intelligence")}
                      value={data.intelligence}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t(
                        "compare.characteristics-details.shedding-level"
                      )}
                      value={data.shedding_level}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t("compare.characteristics-details.social-needs")}
                      value={data.social_needs}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t(
                        "compare.characteristics-details.stranger-friendly"
                      )}
                      value={data.stranger_friendly}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                    <Characteristic
                      label={t("compare.characteristics-details.vocalisation")}
                      value={data.vocalisation}
                      style={{ flexDirection: "column", gap: 5 }}
                    />
                  </View>
                </Section>
              </View>
              <View
                style={{ width: "50%", paddingHorizontal: secondCat ? 0 : 15 }}
              >
                {!secondCat ? (
                  <>
                    <InputSearch
                      searchQuery={searchQuery}
                      setSearchQuery={handleChangeSearchText}
                      placeholder={t("search-breed")}
                      style={{ marginBottom: 20 }}
                    />

                    {isLoadingFiltered && <SkeletonLoaderVertical />}
                    {!isLoadingFiltered && !listFiltered && (
                      <ErrorMessage text={t("error.not-found")} />
                    )}
                    {listFiltered &&
                      listFiltered.length > 0 &&
                      listFiltered.map((item) => (
                        <CatCardVertical
                          item={item}
                          onPress={(cat) => {
                            setSecondCat(cat as CatBreed);
                          }}
                          key={item.id}
                        />
                      ))}
                  </>
                ) : (
                  <>
                    <Section
                      title={t("compare.characteristics")}
                      index={4}
                      animateDuration={100}
                    >
                      <View style={{ gap: 15 }}>
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.adaptability"
                          )}
                          value={secondCat.adaptability}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.affection-level"
                          )}
                          value={secondCat.affection_level}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.child-friendly"
                          )}
                          value={secondCat.child_friendly}
                          style={{ flexDirection: "column", gap: 5 }}
                        />

                        <Characteristic
                          label={t(
                            "compare.characteristics-details.dog-friendly"
                          )}
                          value={secondCat.dog_friendly}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.energy-level"
                          )}
                          value={secondCat.energy_level}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t("compare.characteristics-details.grooming")}
                          value={secondCat.grooming}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.health-issues"
                          )}
                          value={secondCat.health_issues}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.intelligence"
                          )}
                          value={secondCat.intelligence}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.shedding-level"
                          )}
                          value={secondCat.shedding_level}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.social-needs"
                          )}
                          value={secondCat.social_needs}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.stranger-friendly"
                          )}
                          value={secondCat.stranger_friendly}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                        <Characteristic
                          label={t(
                            "compare.characteristics-details.vocalisation"
                          )}
                          value={secondCat.vocalisation}
                          style={{ flexDirection: "column", gap: 5 }}
                        />
                      </View>
                    </Section>
                  </>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

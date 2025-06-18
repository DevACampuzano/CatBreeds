/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated from "react-native-reanimated";

//local imports
import gobalTheme from "../../styles/theme";
import { AppStackParamList } from "../../routes";
import {
  CatCardVertical,
  Characteristic,
  ErrorMessage,
  Header,
  InputSearch,
  Section,
} from "../../components";
import { useBreed, useSearchBreeds } from "../../common/hooks";
import placeholderUrl from "../../common/assets/img/logo_catbreeeds.png";
import SkeletonLoader from "../../components/CatCard/Loading";
import { useEffect, useState } from "react";
import { BreedsActions } from "../../service";
import { useQuery } from "@tanstack/react-query";

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
    }
  }, [secondCat, refetch]);

  if (isLoading) {
    return (
      <View
        style={[
          gobalTheme.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={gobalTheme.primary.color} />
      </View>
    );
  }

  if (!data) {
    return <ErrorMessage text="No results found" />;
  }

  return (
    <View style={gobalTheme.container}>
      <Header
        title={`${data.name} vs ${secondCat ? secondCat?.name : searchQuery}`}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.imageContainer}>
        <Animated.Image
          source={uri ? { uri: uri } : placeholderUrl}
          style={[styles.catImage, { borderBottomLeftRadius: 20 }]}
          sharedTransitionTag={reference_image_id}
          resizeMode="stretch"
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
          resizeMethod="none"
          resizeMode="stretch"
        />
      </View>
      <ScrollView
        style={gobalTheme.container}
        showsVerticalScrollIndicator={false}
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
            {/* <Animated.View
              style={styles.basicInfo}
              entering={FadeInDown.delay(300)}
            >
              <Text style={styles.catName}>{data.name}</Text>
            </Animated.View> */}

            <Section title="Characteristics" index={4}>
              <View style={{ gap: 15 }}>
                <Characteristic
                  label="Adaptability"
                  value={data.adaptability}
                />
                <Characteristic
                  label="Affection Level"
                  value={data.affection_level}
                />
                <Characteristic
                  label="Child Friendly"
                  value={data.child_friendly}
                />
                <Characteristic
                  label="Child Friendly"
                  value={data.child_friendly}
                />
                <Characteristic
                  label="Dog Friendly"
                  value={data.dog_friendly}
                />
                <Characteristic
                  label="Energy Level"
                  value={data.energy_level}
                />
                <Characteristic label="Grooming" value={data?.grooming} />
                <Characteristic
                  label="Health Issues"
                  value={data.health_issues}
                />
                <Characteristic
                  label="Intelligence"
                  value={data.intelligence}
                />
                <Characteristic
                  label="Shedding Level"
                  value={data.shedding_level}
                />
                <Characteristic
                  label="Social Needs"
                  value={data.social_needs}
                />
                <Characteristic
                  label="Stranger Friendly"
                  value={data.stranger_friendly}
                />
                <Characteristic
                  label="Vocalisation"
                  value={data.vocalisation}
                />
              </View>
            </Section>
          </View>
          <View style={{ width: "50%", paddingHorizontal: secondCat ? 0 : 15 }}>
            {!secondCat ? (
              <>
                <InputSearch
                  searchQuery={searchQuery}
                  setSearchQuery={handleChangeSearchText}
                  placeholder="Search for cat breed..."
                  styles={{ marginBottom: 20 }}
                />

                {isLoadingFiltered && <SkeletonLoader />}
                {!isLoadingFiltered && !listFiltered && (
                  <ErrorMessage text="No results found" />
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
                {/* <Animated.View
                  style={styles.basicInfo}
                  entering={FadeInDown.delay(300)}
                >
                  <Text style={styles.catName}>{secondCat.name}</Text>
                </Animated.View> */}

                <Section title="Characteristics" index={4}>
                  <View style={{ gap: 15 }}>
                    <Characteristic
                      label="Adaptability"
                      value={secondCat.adaptability}
                    />
                    <Characteristic
                      label="Affection Level"
                      value={secondCat.affection_level}
                    />
                    <Characteristic
                      label="Child Friendly"
                      value={secondCat.child_friendly}
                    />
                    <Characteristic
                      label="Child Friendly"
                      value={secondCat.child_friendly}
                    />
                    <Characteristic
                      label="Dog Friendly"
                      value={secondCat.dog_friendly}
                    />
                    <Characteristic
                      label="Energy Level"
                      value={secondCat.energy_level}
                    />
                    <Characteristic
                      label="Grooming"
                      value={secondCat.grooming}
                    />
                    <Characteristic
                      label="Health Issues"
                      value={secondCat.health_issues}
                    />
                    <Characteristic
                      label="Intelligence"
                      value={secondCat.intelligence}
                    />
                    <Characteristic
                      label="Shedding Level"
                      value={secondCat.shedding_level}
                    />
                    <Characteristic
                      label="Social Needs"
                      value={secondCat.social_needs}
                    />
                    <Characteristic
                      label="Stranger Friendly"
                      value={secondCat.stranger_friendly}
                    />
                    <Characteristic
                      label="Vocalisation"
                      value={secondCat.vocalisation}
                    />
                  </View>
                </Section>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "stretch",
    height: 250,
    marginBottom: 15,
    position: "relative",
    backgroundColor: gobalTheme.container.backgroundColor,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  catImage: {
    width: "50%",
    height: "100%",
    backgroundColor: gobalTheme.primary.color,
  },
  basicInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  catName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5e3b89",
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
  },
  vs: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -18 }, { translateY: -18 }],
    color: gobalTheme.primary.color,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: Platform.OS === "ios" ? 2 : 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 24,
    fontWeight: "bold",
    zIndex: 1,
    textAlign: "center",
    overflow: "hidden",
  },
});

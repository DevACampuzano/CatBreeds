/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icons from "@react-native-vector-icons/ionicons";
import gobalTheme from "../../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Section } from "../../components/Section/index";
import { Characteristic, NotResultsFound } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { FadeInDown } from "react-native-reanimated";
import { AppNavigationProp, AppStackParamList } from "../../routes";
import { useQuery } from "@tanstack/react-query";
import { BreedsActions } from "../../service";
import { useNavigation } from "@react-navigation/native";
import placeholderUrl from "../../common/assets/logo_catbreeeds.png";

type Props = NativeStackScreenProps<AppStackParamList, "Details">;

export const Details = ({ route }: Props) => {
  const { id, uri, reference_image_id } = route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppNavigationProp>();
  console.log(reference_image_id);
  const { data: catBreed, isLoading } = useQuery({
    queryKey: ["breeds-list", id],
    queryFn: () => BreedsActions.getBreedById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 1,
  });

  if (isLoading) {
    return (
      <View style={gobalTheme.container}>
        <ActivityIndicator size="large" color={gobalTheme.primary.color} />
      </View>
    );
  }

  if (!catBreed) {
    return <NotResultsFound />;
  }

  return (
    <View style={gobalTheme.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 5,
          }}
        >
          <Icons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{catBreed?.name}</Text>
        <View
          style={{
            width: 30,
          }}
        />
      </View>

      <View style={styles.imageContainer}>
        <Animated.Image
          source={uri ? { uri: uri } : placeholderUrl}
          style={styles.catImage}
          sharedTransitionTag={reference_image_id}
          resizeMode="cover"
        />
      </View>
      <ScrollView
        style={gobalTheme.container}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            padding: 20,
          }}
        >
          <Animated.View
            style={styles.basicInfo}
            entering={FadeInDown.delay(300)}
          >
            <Text style={styles.catName}>{catBreed?.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icons
                name="location"
                size={20}
                color={gobalTheme.accent.color}
              />
              <Text style={styles.origin}>{catBreed?.origin}</Text>
            </View>
          </Animated.View>

          <Section title="Description" index={1}>
            <Text style={styles.description}>{catBreed?.description}</Text>
          </Section>
          <Section title="Temper" index={2}>
            <View style={styles.temperamentContainer}>
              {catBreed?.temperament.split(", ").map((trait, index) => (
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
                <Text style={styles.infoValue}>
                  {catBreed?.life_span} years
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Metric</Text>
                <Text style={styles.infoValue}>
                  {catBreed?.weight.metric} kg
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Hypoallergenic</Text>
                <Text style={styles.infoValue}>
                  {catBreed?.hypoallergenic ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          </Section>

          <Section title="Characteristics" index={4}>
            <View style={{ gap: 15 }}>
              <Characteristic
                label="Adaptability"
                value={catBreed?.adaptability}
              />
              <Characteristic
                label="Affection Level"
                value={catBreed?.affection_level}
              />
              <Characteristic
                label="Child Friendly"
                value={catBreed?.child_friendly}
              />
              <Characteristic
                label="Child Friendly"
                value={catBreed?.child_friendly}
              />
              <Characteristic
                label="Dog Friendly"
                value={catBreed?.dog_friendly}
              />
              <Characteristic
                label="Energy Level"
                value={catBreed?.energy_level}
              />
              <Characteristic label="Grooming" value={catBreed?.grooming} />
              <Characteristic
                label="Health Issues"
                value={catBreed?.health_issues}
              />
              <Characteristic
                label="Intelligence"
                value={catBreed?.intelligence}
              />
              <Characteristic
                label="Shedding Level"
                value={catBreed?.shedding_level}
              />
              <Characteristic
                label="Social Needs"
                value={catBreed?.social_needs}
              />
              <Characteristic
                label="Stranger Friendly"
                value={catBreed?.stranger_friendly}
              />
              <Characteristic
                label="Vocalisation"
                value={catBreed?.vocalisation}
              />
            </View>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#5e3b89",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    height: 250,
    marginBottom: 20,
  },
  catImage: {
    width: "100%",
    height: 250,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  basicInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  catName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5e3b89",
    marginBottom: 10,
  },
  origin: {
    fontSize: 18,
    color: "#6c757d",
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  temperamentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  temperamentTag: {
    backgroundColor: "#9F78DC",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  temperamentText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  infoLabel: {
    fontSize: 16,
    color: "#6c757d",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 50,
  },
});

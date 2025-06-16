/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import Icons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
//local imports
import styles from "./styles";
import gobalTheme from "../../styles/theme";
import { BreedsActions } from "../../service";
import { Section } from "../../components/Section/index";
import { Characteristic, ErrorMessage } from "../../components";
import { AppNavigationProp, AppStackParamList } from "../../routes";
import placeholderUrl from "../../common/assets/img/logo_catbreeeds.png";

type Props = NativeStackScreenProps<AppStackParamList, "Details">;

export const Details = ({ route }: Props) => {
  const { id, uri, reference_image_id } = route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppNavigationProp>();
  const { data, isLoading } = useQuery({
    queryKey: ["breeds-list", id],
    queryFn: ({ signal }) => BreedsActions.getBreedById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 1,
  });

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
      <View
        style={[
          styles.header,
          { paddingTop: Platform.OS === "ios" ? insets.top : 30 },
        ]}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={gobalTheme.primary.color}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 5,
          }}
          activeOpacity={0.8}
        >
          <Icons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{data.name}</Text>
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
            <Text style={styles.catName}>{data.name}</Text>
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

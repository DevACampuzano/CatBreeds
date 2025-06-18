import {
  View,
  Image,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//local imports
import styles from "./styles";
import gobalTheme from "../../styles/theme";
import { useBreeds, useSearchBreeds } from "../../common/hooks";
import { AppNavigationProp } from "../../routes";
import SkeletonLoader from "../../components/CatCard/Loading";
import { CatCard, InputSearch, ErrorMessage } from "../../components";
import logo_catbreeeds from "../../common/assets/img/logo_catbreeeds_1.png";

export const Home = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const insets = useSafeAreaInsets();
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoadingBreeds,
    listPages,
  } = useBreeds();
  const {
    searchQuery,
    handleChangeSearchText,
    listFiltered,
    isLoadingFiltered,
  } = useSearchBreeds();

  const handlePressCard = (item: ItemCatCard, imageUrl?: string) => {
    navigation.navigate("Details", {
      id: item.id,
      uri: imageUrl ?? "",
      reference_image_id: item.reference_image_id,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={[gobalTheme.container]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={gobalTheme.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={gobalTheme.primary.color}
          />
          <View
            style={[
              gobalTheme.header,
              {
                paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 5,
              },
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={logo_catbreeeds}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          <InputSearch
            searchQuery={searchQuery}
            setSearchQuery={handleChangeSearchText}
            placeholder="Search for cat breed..."
            style={styles.search}
          />

          {!searchQuery.trim() ? (
            <FlatList
              data={listPages ? listPages.flatMap((page) => page) : []}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item, index }) => (
                <CatCard item={item} onPress={handlePressCard} index={index} />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              onEndReachedThreshold={0.2}
              ListFooterComponent={
                isFetchingNextPage ? (
                  <ActivityIndicator
                    size="large"
                    color={gobalTheme.primary.color}
                  />
                ) : null
              }
              ListEmptyComponent={
                isLoadingBreeds ? (
                  <SkeletonLoader />
                ) : (
                  <ErrorMessage text="No results found" />
                )
              }
            />
          ) : (
            <FlatList
              data={listFiltered}
              renderItem={({ item, index }) => (
                <CatCard item={item} onPress={handlePressCard} index={index} />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                !isLoadingFiltered ? (
                  <ErrorMessage text="No results found" />
                ) : undefined
              }
              ListFooterComponent={
                isLoadingFiltered ? <SkeletonLoader /> : undefined
              }
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

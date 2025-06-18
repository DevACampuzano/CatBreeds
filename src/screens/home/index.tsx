import {
  View,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//local imports
import useStyles from "./styles";
import { useBreeds, useSearchBreeds } from "../../common/hooks";
import SkeletonLoader from "../../components/CatCard/Loading";
import { CatCard, InputSearch, ErrorMessage, Header } from "../../components";
import { useThemeStore } from "../../common/store";
export const Home = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { isDarkMode, colors } = useThemeStore();
  const styles = useStyles(isDarkMode, colors);
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
        style={[styles.container]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.primary}
          />
          <Header logo style={styles.header} />

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
                  <ActivityIndicator size="large" color={colors.primary} />
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

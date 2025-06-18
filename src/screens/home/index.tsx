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
import { useThemeStore } from "../../common/store";
import { useTranslation } from "../../common/hooks/useI18n";
import SkeletonLoader from "../../components/CatCard/Loading";
import { useBreeds, useSearchBreeds } from "../../common/hooks";
import { CatCard, InputSearch, ErrorMessage, Header } from "../../components";

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
  const { t } = useTranslation();
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
            placeholder={t("search-breed")}
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
                  <ErrorMessage text={t("error.not-found")} />
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
                  <ErrorMessage text={t("error.not-found")} />
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

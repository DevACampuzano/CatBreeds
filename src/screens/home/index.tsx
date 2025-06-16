/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  StyleSheet,
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
import gobalTheme from "../../styles/theme";
import { CatCard, InputSearch, NotResultsFound } from "../../components";
import { AppNavigationProp } from "../../routes";
import SkeletonLoader from "../../components/CatCard/Loading";
import { useBreeds } from "../../common/hooks";
import logo_catbreeeds from "../../common/assets/logo_catbreeeds_1.png";

export const Home = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const insets = useSafeAreaInsets();
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoadingBreeds,
    isLoadingFiltered,
    listFiltered,
    listPages,
    searchQuery,
    handleChangeSearchText,
  } = useBreeds();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={[gobalTheme.container, styles.paper]}
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
              { paddingTop: Platform.OS === "ios" ? insets.top : 30 },
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
          />

          {!searchQuery.trim() ? (
            <FlatList
              data={listPages?.flatMap((page) => page.data) ?? []}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item, index }) => (
                <CatCard item={item} navigation={navigation} index={index} />
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
                isLoadingBreeds ? <SkeletonLoader /> : <NotResultsFound />
              }
            />
          ) : (
            <FlatList
              data={
                Array.isArray(listFiltered)
                  ? listFiltered
                  : listFiltered?.data ?? []
              }
              renderItem={({ item, index }) => (
                <CatCard item={item} navigation={navigation} index={index} />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                !isLoadingFiltered ? <NotResultsFound /> : undefined
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

const styles = StyleSheet.create({
  paper: {
    backgroundColor: "#f8f9fa",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 80,
    tintColor: "white",
  },
});

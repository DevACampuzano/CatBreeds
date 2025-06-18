import "react-native-gesture-handler";
import { Image, Platform } from "react-native";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
//local imports
import "./i18n";
import { AppRouter } from "./routes";
import { ErrorMessage } from "./components";
import { TansStackProvider } from "./common/store/TansStack";
import useConnection, { AppStateType } from "./common/hooks/useConnection";
import { useFavoriteStore } from "./common/store";
import { useSyncSystemTheme, useThemeStore } from "./common/store/ThemeStorage";
import { useTranslation } from "./common/hooks/useI18n";

const AppState = () => {
  useSyncSystemTheme();
  return (
    <NavigationContainer>
      <TansStackProvider>
        <AppRouter />
      </TansStackProvider>
    </NavigationContainer>
  );
};

const App = () => {
  const appState = useConnection();
  const { t } = useTranslation();
  useFavoriteStore.persist.rehydrate();
  useThemeStore.persist.rehydrate();

  switch (appState) {
    case AppStateType.CONNECTED:
      return <AppState />;
    case AppStateType.CONNECING:
      const splash =
        Platform.OS === "ios"
          ? require("./common/assets/img/splash.gif")
          : require("./common/assets/img/logo_catbreeeds.png");
      return (
        <View style={styles.centered}>
          <Image source={splash} style={styles.video} resizeMode="contain" />
        </View>
      );
    case AppStateType.DISCONNECTED:
      return (
        <View style={styles.centered}>
          <ErrorMessage
            text={t("error.not-connected")}
            subtitle={t("error.place-check")}
          />
        </View>
      );
  }
};

export default App;

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5C348A",
    flex: 1,
  },
  video: {
    width: 350,
    height: 350,
  },
});

import "react-native-gesture-handler";
import { Image, Platform } from "react-native";
import { StatusBar, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//local imports
import { AppRouter } from "./routes";
import gobalTheme from "./styles/theme";
import { ErrorMessage } from "./components";
import { TansStackProvider } from "./common/store/TansStack";
import useConnection, { AppStateType } from "./common/hooks/useConnection";

const AppState = () => (
  <NavigationContainer>
    <TansStackProvider>
      <AppRouter />
    </TansStackProvider>
  </NavigationContainer>
);

const ConnectedApp = () => (
  <View style={[gobalTheme.container, styles.centered]}>
    <StatusBar
      barStyle="light-content"
      backgroundColor={gobalTheme.primary.color}
    />
    <ErrorMessage
      text="No Internet Connection"
      subtitle="Please check your internet connection."
    />
  </View>
);

const App = () => {
  const appState = useConnection();

  switch (appState) {
    case AppStateType.CONNECTED:
      return <AppState />;
    case AppStateType.CONNECING:
      const splash =
        Platform.OS === "ios"
          ? require("./common/assets/img/splash.gif")
          : require("./common/assets/img/logo_catbreeeds.png");
      return (
        <View style={[gobalTheme.container, styles.centered]}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={styles.centered.backgroundColor}
          />

          <Image source={splash} style={styles.video} resizeMode="contain" />
        </View>
      );
    case AppStateType.DISCONNECTED:
      return <ConnectedApp />;
  }
};

export default App;

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5C348A",
  },
  video: {
    width: 350,
    height: 350,
  },
});

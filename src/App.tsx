import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { AppRouter } from "./routes";
import { TansStackProvider } from "./common/store/TansStack";
import { StatusBar, View, StyleSheet } from "react-native";
import gobalTheme from "./styles/theme";
import { ErrorMessage } from "./components";
import NetInfo from "@react-native-community/netinfo";

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
  const netInfo = NetInfo.useNetInfo();

  return netInfo.isConnected ? <AppState /> : <ConnectedApp />;
};

export default App;

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});

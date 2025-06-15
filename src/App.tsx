import { NavigationContainer } from "@react-navigation/native";
import { AppRouter } from "./routes";
import { TansStackProvider } from "./common/store/TansStack";

const AppState = ()=>(
  <TansStackProvider>
    <AppRouter />
  </TansStackProvider>
)

const App = () => {
  return (
    <NavigationContainer>
      <AppState />
    </NavigationContainer>
  );
};

export default App;

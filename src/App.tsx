import { NavigationContainer } from "@react-navigation/native";
import { AppRouter } from "./routes";

const App = () => {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
};

export default App;

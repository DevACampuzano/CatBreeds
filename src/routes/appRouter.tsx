import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens";
import { NavigationProp } from "@react-navigation/native";
import Details from "../screens/details";

type AppStackParamList = {
  Home: undefined;
  Details: { id: string; uri: string };
};
export type AppNavigationProp = NavigationProp<AppStackParamList>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppRouter = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import { Home, Details, Compare } from "../screens";

export type AppStackParamList = {
  Home: undefined;
  Details: { id: string; uri: string; reference_image_id: string };
  Compare: { id: string; uri: string; reference_image_id: string };
};
export type AppNavigationProp = NavigationProp<AppStackParamList>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "default" }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Compare" component={Compare} />
    </Stack.Navigator>
  );
};

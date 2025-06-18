import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Details, Compare } from "../screens";

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

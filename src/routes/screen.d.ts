type AppStackParamList = {
  Home: undefined;
  Details: { id: string; uri: string; reference_image_id: string };
  Compare: { id: string; uri: string; reference_image_id: string };
};
type AppNavigationProp = NavigationProp<AppStackParamList>;

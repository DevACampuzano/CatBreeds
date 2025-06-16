interface CatCardProps {
  index: number;
  item: {
    id: string;
    reference_image_id: string;
    name: string;
    origin: string;
    intelligence: number;
  };
  navigation: AppNavigationProp;
}

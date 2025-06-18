type ItemCatCard = {
  id: string;
  reference_image_id: string;
  name: string;
  origin: string;
  intelligence: number;
};
interface CatCardProps {
  index: number;
  item: ItemCatCard;
  onPress: (item: ItemCatCard | CatBreed, imageUrl?: string) => void;
  // navigation: AppNavigationProp;
}

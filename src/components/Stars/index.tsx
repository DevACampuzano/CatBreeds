import Icons from "@react-native-vector-icons/ionicons";

export const Stars = (rating: number) =>
  Array.from({ length: 5 }, (_, index) => (
    <Icons
      key={index}
      name={index < rating ? "star" : "star-outline"}
      size={16}
      color="#FFD700"
    />
  ));

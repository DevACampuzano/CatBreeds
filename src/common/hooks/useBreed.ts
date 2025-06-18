import { useQuery } from "@tanstack/react-query";
import { BreedsActions } from "../../service";

const useBreed = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["breeds-list", id],
    queryFn: ({ signal }) => BreedsActions.getBreedById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 1,
  });

  return { data, isLoading };
};

export default useBreed;

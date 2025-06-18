import { useInfiniteQuery } from "@tanstack/react-query";
import { BreedsActions } from "../../service";

export default () => {
  const {
    data: { pages: listPages } = {},
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingBreeds,
  } = useInfiniteQuery({
    queryKey: ["breeds-list"],
    queryFn: ({ pageParam = 0, signal }) =>
      BreedsActions.getBreeds(6, pageParam, signal),
    getNextPageParam: (_, allPages) => allPages.length,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
  });

  return {
    listPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoadingBreeds,
  };
};

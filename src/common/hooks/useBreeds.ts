import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BreedsActions } from "../../service";
import { useCallback, useState } from "react";
import useDebounce from "./useDebounce";

export default () => {
  const [searchQuery, setSearchQuery] = useState("");
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
    getNextPageParam: (_, allPages) => {
      return allPages.length;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
  });

  const {
    data: listFiltered = [],
    isLoading: isLoadingFiltered,
    refetch,
  } = useQuery({
    queryKey: ["breeds-list", searchQuery],
    queryFn: ({ signal }) =>
      BreedsActions.getSearchBreeds(searchQuery.trim(), signal),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 60,
  });

  const debouncedRefetch = useDebounce(refetch, 500);

  const handleChangeSearchText = useCallback(
    (search: string) => {
      setSearchQuery(search);
      debouncedRefetch();
    },
    [debouncedRefetch]
  );

  return {
    searchQuery,
    handleChangeSearchText,
    listPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoadingBreeds,
    listFiltered,
    isLoadingFiltered,
  };
};

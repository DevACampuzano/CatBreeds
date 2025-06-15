import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BreedsActions } from "../../service";

export default () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const {
    data: { pages: listPages } = {},
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingBreeds,
  } = useInfiniteQuery({
    queryKey: ["breeds-list"],
    queryFn: ({ pageParam = 0 }) =>
      BreedsActions.getBreeds(6, pageParam as number),
    getNextPageParam: (_, allPages) => {
      return allPages.length;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(idTimeout);
  }, [searchQuery]);

  const { data: listFiltered = [], isLoading: isLoadingFiltered } = useQuery({
    queryKey: ["breeds-list", debouncedQuery],
    queryFn: () => BreedsActions.getSearchBreeds(debouncedQuery.trim()),
    enabled: !!debouncedQuery,
    staleTime: 1000 * 60 * 5,
  });

  return {
    searchQuery,
    setSearchQuery,
    listPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoadingBreeds,
    listFiltered,
    isLoadingFiltered,
  };
};

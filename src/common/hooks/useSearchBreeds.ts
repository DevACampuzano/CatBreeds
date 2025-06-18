import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import useDebounce from "./useDebounce";
import { BreedsActions } from "../../service";

const useSearchBreeds = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
    listFiltered,
    isLoadingFiltered,
  };
};

export default useSearchBreeds;

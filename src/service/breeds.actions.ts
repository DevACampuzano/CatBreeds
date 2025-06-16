import { theCatApi } from "../common/api";

export const getSearchBreeds = async (q: string, signal?: AbortSignal) => {
  const params = new URLSearchParams();
  if (!q) {
    throw new Error("Search query cannot be empty");
  }
  params.append("q", q);
  return await theCatApi.get<CatBreed[]>(
    `/breeds/search?${params.toString()}`,
    { signal }
  );
};

export const getBreeds = async (
  limit: number = 10,
  page: number = 0,
  signal?: AbortSignal
) => {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("page", page.toString());
  return await theCatApi.get<CatBreed[]>(`/breeds?${params.toString()}`, {
    signal,
  });
};

export const getBreedById = async (id: string, signal?: AbortSignal) => {
  if (!id) throw new Error("ID cannot be empty");
  const response = await theCatApi.get<CatBreed>(`/breeds/${id}`, { signal });
  return response.data;
};

export const getImageById = async (id: string, signal?: AbortSignal) => {
  if (!id) throw new Error("Image ID cannot be empty");
  const response = await theCatApi.get<CatBreedImage>(`/images/${id}`, {
    signal,
  });
  return response.data;
};

export default {
  getSearchBreeds,
  getBreeds,
  getBreedById,
  getImageById,
};

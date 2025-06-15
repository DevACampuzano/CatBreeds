import { theCatApi } from "../common/api";

export const getSearchBreeds = async (q: string) => {
  const params = new URLSearchParams();
  if (!q) {
    throw new Error("Search query cannot be empty");
  }
  params.append("q", q);
  return await theCatApi.get<CatBreed[]>(`/breeds/search?${params.toString()}`);
};

export const getBreeds = async (limit: number = 10, page: number = 0) => {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("page", page.toString());
  return await theCatApi.get<CatBreed[]>(`/breeds?${params.toString()}`);
};

export const getBreedById = async (id: string) => {
  if (!id) throw new Error("ID cannot be empty");
  return await theCatApi.get<CatBreed>(`/breeds/${id}`);
};

export default {
  getSearchBreeds,
  getBreeds,
  getBreedById,
};

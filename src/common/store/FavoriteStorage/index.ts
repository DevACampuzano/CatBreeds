import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type FavoriteState = {
  favorites: string[];
};

interface FavoriteActions {
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const initialState: FavoriteState = {
  favorites: [],
};

const storeApi: StateCreator<FavoriteState & FavoriteActions> = (set, get) => ({
  ...initialState,
  addFavorite: (id: string) => {
    const { favorites } = get();
    if (!favorites.includes(id)) {
      console.log("Adding favorite:", id);
      set((state) => {
        state.favorites.push(id);
        return state;
      });
    }
  },
  removeFavorite: (id: string) => {
    const { favorites } = get();
    if (favorites.includes(id)) {
      set((state) => {
        state.favorites = state.favorites.filter((favId) => favId !== id);
        return state;
      });
    }
  },
  isFavorite: (id: string) => {
    const { favorites } = get();
    return favorites.includes(id);
  },
});

export const useFavoriteStore = create<FavoriteState & FavoriteActions>()(
  devtools(
    persist(immer(storeApi), {
      name: "favorite-storage",
      storage: createJSONStorage(() => AsyncStorage),
    })
  )
);

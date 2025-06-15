import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface UserState {
  name: string;
  email: string;
  age: number;
  isLoggedIn: boolean;
  // Add other user-related properties as needed
}

const initialState: UserState = {
  name: "",
  email: "",
  age: 0,
  isLoggedIn: false,
  // Add other initial properties as needed
};
const storeAPI: StateCreator<
  /*State & Action*/ UserState,
  [["zustand/devtools", never]]
> = () =>
  //   set,
  //   get
  ({
    ...initialState,
  });

export const useUserStore = create<UserState>()(
  persist(immer(devtools(storeAPI)), {
    name: "dataUser",
    storage: createJSONStorage(() => AsyncStorage),
  })
);

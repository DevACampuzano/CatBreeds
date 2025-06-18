import { useColorScheme } from "react-native";
import { useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const lightColors = {
  primary: "#5e3b89",
  accent: "#9F78DC",
  background: "f8f9fa",
  surface: "#ffffff",
  text: "#333333",
  textSecondary: "#6c757d",
  border: "#e9ecef",
  cardBackground: "#ffffff",
  headerBackground: "#5e3b89",
};

const darkColors = {
  primary: "#9F78DC",
  accent: "#B794E6",
  background: "#1a1a1a",
  surface: "#2d2d2d",
  text: "#ffffff",
  textSecondary: "#a0a0a0",
  border: "#404040",
  cardBackground: "#2d2d2d",
  headerBackground: "#2d2d2d",
};

interface ThemeState {
  isDarkMode: boolean;
  colors: typeof lightColors;
  toggleTheme: () => void;
  setSystemTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      colors: lightColors,
      toggleTheme: () =>
        set((state) => {
          const isDark = !state.isDarkMode;
          return {
            isDarkMode: isDark,
            colors: isDark ? darkColors : lightColors,
          };
        }),
      setSystemTheme: (isDark) =>
        set(() => ({
          isDarkMode: isDark,
          colors: isDark ? darkColors : lightColors,
        })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);

export function useSyncSystemTheme() {
  const systemColorScheme = useColorScheme();
  const setSystemTheme = useThemeStore((state) => state.setSystemTheme);

  useEffect(() => {
    const getLocalStorageTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme-storage");
      if (storedTheme) {
        const parsedTheme = JSON.parse(storedTheme);
        setSystemTheme(parsedTheme.state.isDarkMode);
      } else {
        setSystemTheme(systemColorScheme === "dark");
      }
    };
    getLocalStorageTheme();
  }, [systemColorScheme, setSystemTheme]);
}

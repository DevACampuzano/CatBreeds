interface Colors {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  cardBackground: string;
  headerBackground: string;
}
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: Colors;
}

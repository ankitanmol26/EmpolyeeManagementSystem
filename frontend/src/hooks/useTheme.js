import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProviderContext";

export function useTheme() {
  return useContext(ThemeContext);
}

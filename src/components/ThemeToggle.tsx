import { useProductContext } from "../context/ProductContext";
import "./ThemeToggle.css";

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useProductContext();

  return (
    <button
      className="theme-toggle"
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle-icon">{isDarkMode ? "☀️" : "🌙"}</span>
    </button>
  );
};

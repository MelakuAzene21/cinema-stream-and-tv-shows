import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./ThemeToggle.css"; // Add CSS for styling

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
};

export default ThemeToggle;

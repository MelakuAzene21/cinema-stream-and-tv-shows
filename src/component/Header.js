import { Link } from "react-router-dom";
import mele from "../images/mele.jpg";
import "./Header.css";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo">
                🎬 Movie<span>App</span>
            </Link>

            <div className="header-right">
                <LanguageSwitcher />
                <ThemeToggle />
                <img src={mele} alt="User" className="user-image" />
            </div>
        </header>
    );
}

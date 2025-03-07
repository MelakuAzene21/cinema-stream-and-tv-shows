import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for the mobile menu
import mele from "../images/mele.jpg";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <Link to="/" className="logo">
                🎬 Movie<span>App</span>
            </Link>

            <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/calendar" onClick={() => setMenuOpen(false)}>Calendar</Link>
                <LanguageSwitcher />
                <ThemeToggle />
                <img src={mele} alt="User" className="user-image" />
            </nav>

            {/* Mobile Menu Button */}
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
        </header>
    );
}

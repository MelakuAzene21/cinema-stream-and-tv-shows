import { Link } from "react-router-dom";
import mele from "../images/mele.jpg";
import "./Header.css";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo">
                🎬 Movie App
            </Link>
            <div className="user-profile">
                <ThemeToggle/>
                <img src={mele} alt="User" className="user-image" />
            </div>
        </header>
    );
}

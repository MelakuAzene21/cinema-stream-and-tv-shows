import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
            <p className="not-found-text">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="home-button">
                Go to Home
            </Link>
        </div>
    );
};

export default PageNotFound;

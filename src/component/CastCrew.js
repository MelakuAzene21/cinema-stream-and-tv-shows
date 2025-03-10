import { useEffect, useState } from "react";
import axios from "axios";
import "./CastCrew.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { LanguageContext } from './LanguageContext'; // Import global language
import { useContext } from "react";
const apiKey = "b994fce496fc0f962a6908ff2a4ba539";

const CastCrew = ({ movieId }) => {
    const [cast, setCast] = useState([]);
    const { language } = useContext(LanguageContext); // Get selected language

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=${language}`
                );
                setCast(response.data.cast.slice(0, 10)); // Show only top 10 actors
            } catch (error) {
                console.error("Error fetching cast:", error);
            }
        };
        fetchCast();
    }, [movieId]);

    if (!cast.length) return null; // If no cast data, return nothing

    return (
        <div className="cast-container">
            <h3>Cast & Crew</h3>
            <div className="cast-scroll">
                {cast.map((actor) => (
                    <div key={actor.id} className="cast-card">
                        {/* Link to Actor Profile */}
                        <Link to={`/actor/${actor.id}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className="cast-image"
                        />
                            <p>{actor.name}</p>
                            </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CastCrew;

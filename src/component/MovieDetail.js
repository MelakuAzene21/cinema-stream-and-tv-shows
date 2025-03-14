import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MovieModal from "./MovieModal";
import SkeletonMovieDetail from "./SkeletonMovieDetail";
import "./MovieDetail.css";
import { LanguageContext } from "./LanguageContext";
import Soundtracks from "./Soundtracks";
import BoxOfficeChart from "./BoxOfficeChart";
import MovieVideos from "./MovieVideos";
import CastCrew from "./CastCrew"; // Import CastCrew Component

const apiKey = "b994fce496fc0f962a6908ff2a4ba539";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const movieResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language}`
                );
                setMovie(movieResponse.data);

                const trailerResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
                );
                const trailer = trailerResponse.data.results.find(
                    (video) => video.type === "Trailer"
                );
                if (trailer) {
                    setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
                }

                // Fetch related movies
                const relatedResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=${language}`
                );
                setRelatedMovies(relatedResponse.data.results.slice(0, 6)); // Limit to 6 movies
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetail();
    }, [id, language]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!movie) return <SkeletonMovieDetail />;

    return (
        <div className="movie-detail-container">
            <div className="movie-detail">
                <div className="movie-poster-container">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                    />
                </div>

                <div className="movie-info">
                    <h1 className="movie-title">{movie.title}</h1>
                    <p className="movie-overview">{movie.overview}</p>

                    <div className="movie-meta">
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> {movie.vote_average}</p>
                        <p><strong>Popularity:</strong> {movie.popularity}</p>
                    </div>

                    <button onClick={openModal} className="watch-trailer-btn">
                        Watch Trailer
                    </button>

                    <BoxOfficeChart movieId={movie.id} />
                    <MovieVideos movieId={movie.id} />
                    <Soundtracks movieId={movie.id} />
                </div>
            </div>

            {/* Related Movies Section */}
            {relatedMovies.length > 0 && (
                <div className="related-movies">
                    <h2>You May Also Like</h2>
                    <div className="related-movies-grid">
                        {relatedMovies.map((relatedMovie) => (
                            <Link key={relatedMovie.id} to={`/movie/${relatedMovie.id}`} className="related-movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${relatedMovie.poster_path}`}
                                    alt={relatedMovie.title}
                                    className="related-movie-image"
                                />
                                <div className="related-movie-details">
                                    <h3>{relatedMovie.title}</h3>
                                    <p className="related-movie-rating">⭐ {relatedMovie.vote_average}</p>
                                    <CastCrew movieId={relatedMovie.id} /> {/* Show Cast for each movie */}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal to watch trailer */}
            <MovieModal trailerUrl={trailerUrl} isOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
};

export default MovieDetail;

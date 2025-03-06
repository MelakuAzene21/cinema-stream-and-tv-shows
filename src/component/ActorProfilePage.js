import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ActorProfile.css'; // Add your styles for this page
import SkeletonLoader from './SkeletonLoader'; // For loading state

const apiKey ='b994fce496fc0f962a6908ff2a4ba539'; // TMDb API key

const ActorProfilePage = () => {
    const { id } = useParams(); // Get actor ID from URL
    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState({ acting: [], directing: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActorDetails = async () => {
            try {
                // Fetch actor's details (biography, name, image)
                const actorResponse = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`);
                setActor(actorResponse.data);

                // Fetch the movies they acted in and directed
                const movieCreditsResponse = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`);
                setMovies({
                    acting: movieCreditsResponse.data.cast,
                    directing: movieCreditsResponse.data.crew.filter(movie => movie.job === 'Director')
                });

                setLoading(false); // Set loading state to false once data is fetched
            } catch (error) {
                console.error("Error fetching actor data:", error);
                setLoading(false);
            }
        };

        fetchActorDetails();
    }, [id]);

    if (loading) return <SkeletonLoader />; // Show loader while data is fetching

    return (
        <div className="actor-profile-container">
            <div className="actor-header">
                <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    className="actor-profile-image"
                />
                <div className="actor-info">
                    <h1>{actor.name}</h1>
                    <p>{actor.biography || 'Biography not available.'}</p>
                    <div className="actor-movies">
                        <h3>Movies (Acted)</h3>
                        <div className="movie-list">
                            {movies.acting.map((movie) => (
                                <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                    <h4>{movie.title}</h4>
                                </Link>
                            ))}
                        </div>

                        <h3>Movies (Directed)</h3>
                        <div className="movie-list">
                            {movies.directing.map((movie) => (
                                <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                    <h4>{movie.title}</h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActorProfilePage;

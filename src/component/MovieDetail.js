import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieModal from './MovieModal'; // Import modal component
import SkeletonMovieDetail from './SkeletonMovieDetail'; // Import Skeleton for loading state
import './MovieDetail.css'; // Updated styles for MovieDetail

const apiKey = 'b994fce496fc0f962a6908ff2a4ba539';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const movieResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
                );
                setMovie(movieResponse.data);

                const trailerResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
                );
                const trailer = trailerResponse.data.results.find(
                    (video) => video.type === 'Trailer'
                );
                if (trailer) {
                    setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetail();
    }, [id]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Display Skeleton while loading movie details
    if (!movie) return <SkeletonMovieDetail />;

    return (
        <div className="movie-detail-container">
            <div className="movie-detail">
                {/* Movie Poster */}
                <div className="movie-poster-container">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                    />
                </div>

                {/* Movie Info */}
                <div className="movie-info">
                    <h1 className="movie-title">{movie.title}</h1>
                    <p className="movie-overview">{movie.overview}</p>

                    <div className="movie-meta">
                        <p>
                            <strong>Release Date:</strong> {movie.release_date}
                        </p>
                        <p>
                            <strong>Rating:</strong> {movie.vote_average}
                        </p>
                        <p>
                            <strong>Popularity:</strong> {movie.popularity}
                        </p>
                    </div>

                    <button onClick={openModal} className="watch-trailer-btn">
                        Watch Trailer
                    </button>
                </div>
            </div>

            {/* Modal to watch trailer */}
            <MovieModal
                trailerUrl={trailerUrl}
                isOpen={isModalOpen}
                closeModal={closeModal}
            />
        </div>
    );
};

export default MovieDetail;

// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getAllMovies } from "../features/movies/MoviesSlice";
// import "./MovieDetail.css";

// const MovieDetail = () => {
//     const { id } = useParams();
//     const movies = useSelector(getAllMovies);
//     const movie = movies.find((m) => m.id.toString() === id);

//     if (!movie) return <h2>Movie not found</h2>;

//     return (
//         <div className="movie-detail">
//             <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//             <div className="movie-info">
//                 <h2>{movie.title}</h2>
//                 <p>{movie.overview}</p>
//                 <p><strong>Release Date:</strong> {movie.release_date}</p>
//                 <p><strong>Rating:</strong> {movie.vote_average}</p>
//                 <p><strong>Popularity:</strong> {movie.popularity}</p>
//             </div>
//         </div>
//     );
// };

// export default MovieDetail;


import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMovies } from "../features/movies/MoviesSlice";
import { useEffect, useState } from "react";
import "./MovieDetail.css";
import SkeletonMovieDetail from "./SkeletonMovieDetail";

const MovieDetail = () => {
    const { id } = useParams();
    const movies = useSelector(getAllMovies);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate loading delay
        return () => clearTimeout(timer);
    }, [id, movies]);

    const movie = movies.find((m) => m.id.toString() === id);

    if (!movie && !loading) return <h2>Movie not found</h2>;

    return (
        <div className="movie-detail">
            {loading ? (
                <SkeletonMovieDetail />
            ) : (
                <>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-info">
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> {movie.vote_average}</p>
                        <p><strong>Popularity:</strong> {movie.popularity}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieDetail;

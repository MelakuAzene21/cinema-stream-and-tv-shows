import MovieCard from "./MovieCard";
import "./MovieListing.css";

export const MovieListing = ({ movies, loading }) => {
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>MOVIES</h2>
        <div className="movie-container">
          {loading ? (
            // Show skeleton loaders while loading
            [...Array(10)].map((_, index) => (
              <div key={index} className="skeleton-loader"></div>
            ))
          ) : movies && movies.length ? (
            movies.map((movie) => <MovieCard key={movie.id} data={movie} />)
          ) : (
            <h3>No movies found</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieListing;

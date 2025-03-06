// import MovieCard from "./MovieCard";
// import "./MovieListing.css";

// export const MovieListing = ({ movies, loading }) => {
//   return (
//     <div className="movie-wrapper">
//       <div className="movie-list">
//         <h2>MOVIES</h2>
//         <div className="movie-container">
//           {loading ? (
//             [...Array(10)].map((_, index) => (
//               <div key={index} className="skeleton-loader"></div>
//             ))
//           ) : movies && movies.length ? (
//             movies.map((movie) => <MovieCard key={movie.id} data={movie} />)
//           ) : (
//             <h3>No movies found</h3>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieListing;


import MovieCard from "./MovieCard";
import CastCrew from "./CastCrew";  // Import Cast & Crew Component
import "./MovieListing.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export const MovieListing = ({ movies, loading }) => {
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <h2 style={{ display: "inline" }}>MOVIES</h2>
          <h2 style={{ display: "inline" }}>
            <Link to="/tv" style={{ textDecoration: "none", color: "blue" }}>
              TV Shows
            </Link>
          </h2>
        </div>


        <div className="movie-container">
          {loading ? (
            [...Array(10)].map((_, index) => (
              <div key={index} className="skeleton-loader"></div>
            ))
          ) : movies && movies.length ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <MovieCard data={movie} />
                <CastCrew movieId={movie.id} /> {/* Show Cast for each movie */}
              </div>
            ))
          ) : (
            <h3>No movies found</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieListing;

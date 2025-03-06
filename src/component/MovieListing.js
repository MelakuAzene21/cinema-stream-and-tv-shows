// import { useSelector } from "react-redux"
// import { getAllMovies } from "../features/movies/MoviesSlice"
// import MovieCard from './MovieCard'
// import './MovieListing.css'

//    export const MovieListing=()=>{

//     const movies=useSelector(getAllMovies);
    
// return(
//     <div className="movie-wrapper">
//   <div className=" movie-list ">
//     <h2>MOVIES</h2>
//     <div className="movie-container">
//         {movies&&movies.length &&
//                     movies.map(movie=><MovieCard key={movie.id} data={movie} />)}
//     </div>
//   </div>
//     </div>
// )

// }


import { useSelector } from "react-redux";
import { getAllMovies } from "../features/movies/MoviesSlice";
import MovieCard from "./MovieCard";
import SkeletonLoader from "./SkeletonLoader";
import "./MovieListing.css";

export const MovieListing = ({ loading }) => {
  const movies = useSelector(getAllMovies);

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>MOVIES</h2>
        <div className="movie-container">
          {loading
            ? Array(10)
              .fill()
              .map((_, index) => <SkeletonLoader key={index} />)
            : movies.map((movie) => <MovieCard key={movie.id} data={movie} />)}
        </div>
      </div>
    </div>
  );
};


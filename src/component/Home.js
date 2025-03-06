import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMovies, getAllMovies } from "../features/movies/MoviesSlice";
import MovieListing from "./MovieListing";
import "./Home.css";

const apiKey = "b994fce496fc0f962a6908ff2a4ba539";
const totalPages = 8; // Fetch movies from multiple pages

export default function Home() {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies = [];
        for (let page = 1; page <= totalPages; page++) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
          );
          allMovies = [...allMovies, ...response.data.results];
        }
        dispatch(addMovies(allMovies));
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [dispatch]);

  // Search movies with debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        setFilteredMovies(
          movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredMovies(movies);
      }
    }, 300); // 300ms delay for performance

    return () => clearTimeout(timer);
  }, [searchQuery, movies]);

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="banner-image">
        <MovieListing movies={filteredMovies} loading={loading} />
      </div>
    </>
  );
}

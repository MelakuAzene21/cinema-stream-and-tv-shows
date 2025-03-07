import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMovies, getAllMovies } from "../features/movies/MoviesSlice";
import MovieListing from "./MovieListing";
import TrendingMovies from "./TrendingMovies";
import TVShows from "./TVShows";
import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import ReactPaginate from "react-paginate";
import "./Home.css";

const apiKey = "b994fce496fc0f962a6908ff2a4ba539";
const moviesPerPage = 30;

export default function Home() {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const { language } = useContext(LanguageContext);

  const [currentPage, setCurrentPage] = useState(0);

  // Fetch Genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, [language]);

  // Fetch Movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies = [];
        for (let page = 1; page <= 8; page++) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&page=${page}`
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

  // Search & Genre Filter
  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = movies;

      if (selectedGenre) {
        filtered = filtered.filter((movie) =>
          movie.genre_ids.includes(parseInt(selectedGenre))
        );
      }

      if (searchQuery.trim()) {
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredMovies(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedGenre, movies]);

  // Get Current Page Movies
  const offset = currentPage * moviesPerPage;
  const currentMovies = filteredMovies.slice(offset, offset + moviesPerPage);
  const pageCount = Math.ceil(filteredMovies.length / moviesPerPage);

  // Handle Page Click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {/* Trending Movies */}
      <TrendingMovies />

      <div className="filters-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="genre-dropdown"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Listing */}
      <div className="banner-image">
        <MovieListing movies={currentMovies} loading={loading} />
        {/* Pagination Component */}
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          previousClassName={"prev-item"}
          nextClassName={"next-item"}
          disabledClassName={"disabled"}
        />
        <TVShows />
      </div>

     
    </>
  );
}

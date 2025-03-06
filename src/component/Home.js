// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { addMovies, getAllMovies } from "../features/movies/MoviesSlice";
// import MovieListing from "./MovieListing";
// import "./Home.css";

// const apiKey = "b994fce496fc0f962a6908ff2a4ba539";
// const totalPages = 8;

// export default function Home() {
//   const dispatch = useDispatch();
//   const movies = useSelector(getAllMovies);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("");

//   // Fetch Genres
//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
//         );
//         setGenres(response.data.genres);
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };
//     fetchGenres();
//   }, []);

//   // Fetch Movies
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         let allMovies = [];
//         for (let page = 1; page <= totalPages; page++) {
//           const response = await axios.get(
//             `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
//           );
//           allMovies = [...allMovies, ...response.data.results];
//         }
//         dispatch(addMovies(allMovies));
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [dispatch]);

//   // Search & Genre Filter with Debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       let filtered = movies;

//       if (selectedGenre) {
//         filtered = filtered.filter((movie) =>
//           movie.genre_ids.includes(parseInt(selectedGenre))
//         );
//       }

//       if (searchQuery.trim()) {
//         filtered = filtered.filter((movie) =>
//           movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       }

//       setFilteredMovies(filtered);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery, selectedGenre, movies]);

//   return (
//     <>
//       <div className="filters-container">
//         {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Search movies..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="search-bar"
//         />

//         {/* Genre Dropdown */}
//         <select
//           value={selectedGenre}
//           onChange={(e) => setSelectedGenre(e.target.value)}
//           className="genre-dropdown"
//         >
//           <option value="">All Genres</option>
//           {genres.map((genre) => (
//             <option key={genre.id} value={genre.id}>
//               {genre.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="banner-image">
//         <MovieListing movies={filteredMovies} loading={loading} />
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMovies, getAllMovies } from "../features/movies/MoviesSlice";
import MovieListing from "./MovieListing";
import TrendingMovies from "./TrendingMovies.js"; // Import trending movies component
import "./Home.css";

const apiKey = "b994fce496fc0f962a6908ff2a4ba539";
const totalPages = 8;

export default function Home() {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  // Fetch Genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch Movies
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

  // Search & Genre Filter with Debounce
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

  return (
    <>
      {/* Trending Movies Section */}
      <TrendingMovies />

      <div className="filters-container">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        {/* Genre Dropdown */}
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

      <div className="banner-image">
        <MovieListing movies={filteredMovies} loading={loading} />
      </div>
    </>
  );
}

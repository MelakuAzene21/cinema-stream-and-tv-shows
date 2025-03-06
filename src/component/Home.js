
// import {MovieListing} from "./MovieListing"
// import { addMovies } from "../features/movies/MoviesSlice";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// // import { API_KEY }from '../common/api/MovieAPIKey'

// const apiKey = 'b994fce496fc0f962a6908ff2a4ba539';
// export default function Home(){

//   const dispatch=useDispatch();
  
//     const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

//     axios.get(apiUrl)
//         .then(response => {
//           dispatch(addMovies(response.data.results))
//           console.log("response from api url", response)
         



//         })
//         .catch(error => {
//             console.error(`Error fetching movies: ${error}`);
//         });
//     return(
//       <>
//       <div className="banner-image">
//         <MovieListing/>
//       </div>
//       </>

//     )
// }


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MovieListing } from "./MovieListing";
import { addMovies } from "../features/movies/MoviesSlice";
import axios from "axios";
import { useState } from "react";

const apiKey = "b994fce496fc0f962a6908ff2a4ba539";
const totalPages = 8; // Fetch 3 pages (adjust based on requirement)

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies = [];
        for (let page = 1; page <= totalPages; page++) {
          const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
          const response = await axios.get(apiUrl);
          allMovies = [...allMovies, ...response.data.results];
        }
        dispatch(addMovies(allMovies));
        setLoading(false); // Stop loading after fetching movies

      } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        setLoading(false);

      }
    };

    fetchMovies();
  }, [dispatch]);

  return (
    <div className="banner-image">
      <MovieListing loading={loading} />
    </div>
  );
}

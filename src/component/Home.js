
import {MovieListing} from "./MovieListing"
import { addMovies } from "../features/movies/MoviesSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
// import { API_KEY }from '../common/api/MovieAPIKey'

const apiKey = 'b994fce496fc0f962a6908ff2a4ba539';
export default function Home(){

  const dispatch=useDispatch();
  
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    axios.get(apiUrl)
        .then(response => {
          dispatch(addMovies(response.data.results))
          console.log("response from api url", response)
          console.log("response data of data", response.data)
          console.log("response data of data results", response.data.results)



        })
        .catch(error => {
            console.error(`Error fetching movies: ${error}`);
        });
    return(
      <>
      <div className="banner-image">
        <MovieListing/>
      </div>
      </>

    )
}
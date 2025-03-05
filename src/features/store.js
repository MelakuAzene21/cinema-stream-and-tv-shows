import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movies/MoviesSlice'
export const store=configureStore({

    reducer: {
        movies: movieReducer
    },
})
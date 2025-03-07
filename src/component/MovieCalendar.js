import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import Modal from "react-modal";
import "./MovieCalendar.css"; // Import styles

const API_KEY = "b994fce496fc0f962a6908ff2a4ba539"; // Replace with your TMDB API Key

const MovieCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Fetch movies on selected date
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const formattedDate = selectedDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${formattedDate}&primary_release_date.lte=${formattedDate}`
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, [selectedDate]);

    // Open modal when a movie is clicked
    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedMovie(null);
    };

    return (
        <div className="movie-calendar-container">
            <h2>📅 Movie Release Calendar</h2>
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="custom-calendar"
            />

            <div className="movies-list">
                <h3>Movies Releasing on {selectedDate.toDateString()}:</h3>
                {movies.length === 0 ? (
                    <p>No movies found for this date.</p>
                ) : (
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.id} onClick={() => openModal(movie)}>
                                🎬 {movie.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Movie Details Modal */}
            {selectedMovie && (
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>{selectedMovie.title}</h2>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
                        alt={selectedMovie.title}
                    />
                    <p>{selectedMovie.overview}</p>
                    <button onClick={closeModal} className="close-button">Close</button>
                </Modal>
            )}
        </div>
    );
};

export default MovieCalendar;

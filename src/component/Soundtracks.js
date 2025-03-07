import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Soundtracks.css";

const apiKey = "AIzaSyDu9HAK7dZbeWN_AMc1GCquTba4zYnEqMY"; // Replace with your TMDB API key
const youtubeApiKey = "AIzaSyDu9HAK7dZbeWN_AMc1GCquTba4zYnEqMY"; // Replace with your YouTube API key

const Soundtracks = ({ movieId }) => {
    const [movieTitle, setMovieTitle] = useState("");
    const [soundtracks, setSoundtracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
                );
                setMovieTitle(response.data.title);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        const fetchSoundtracks = async () => {
            try {
                if (!movieTitle) return;

                const searchQuery = `${movieTitle} soundtrack`;
                const youtubeResponse = await axios.get(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${youtubeApiKey}`
                );

                setSoundtracks(
                    youtubeResponse.data.items.map((item) => ({
                        title: item.snippet.title,
                        youtube: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                    }))
                );
            } catch (error) {
                console.error("Error fetching soundtracks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
        fetchSoundtracks();
    }, [movieId, movieTitle]);

    if (loading) return <p className="loading">Loading soundtracks...</p>;

    return (
        <div className="soundtracks-container">
            <h2>🎵 {movieTitle} Soundtracks</h2>
            {soundtracks.length === 0 ? (
                <p>No soundtracks found.</p>
            ) : (
                <ul className="soundtrack-list">
                    {soundtracks.map((track, index) => (
                        <li key={index} className="soundtrack-item">
                            <span className="track-title">{track.title}</span>
                            <div className="track-links">
                                {track.youtube && (
                                    <a href={track.youtube} target="_blank" rel="noopener noreferrer" className="youtube-link">
                                        ▶ Watch on YouTube
                                    </a>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Soundtracks;

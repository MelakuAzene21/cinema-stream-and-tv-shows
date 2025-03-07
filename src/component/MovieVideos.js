import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./MovieVideos.css";

const API_KEY = "b994fce496fc0f962a6908ff2a4ba539"; // Replace with your TMDB API key

const MovieVideos = ({ movieId }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
                );
                setVideos(response.data.results || []);
            } catch (error) {
                console.error("Error fetching movie videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [movieId]);

    if (loading) return <p className="loading">Loading videos...</p>;

    // Categorize videos
    const trailers = videos.filter(video => video.type === "Trailer");
    const behindTheScenes = videos.filter(video => video.type === "Behind the Scenes");
    const featurettes = videos.filter(video => video.type === "Featurette");
    const bloopers = videos.filter(video => video.type === "Bloopers");

    const renderVideos = (videoList) =>
        videoList.length > 0 ? (
            <div className="video-grid">
                {videoList.map(video => (
                    <div key={video.id} className="video-item">
                        <iframe
                            src={`https://www.youtube.com/embed/${video.key}`}
                            title={video.name}
                            allowFullScreen
                        ></iframe>
                        <p>{video.name}</p>
                    </div>
                ))}
            </div>
        ) : (
            <p>No videos available.</p>
        );

    return (
        <div className="movie-videos">
            <h2>🎥 Movie Clips & Behind-the-Scenes</h2>
            <Tabs>
                <TabList>
                    <Tab>Trailers</Tab>
                    <Tab>Behind the Scenes</Tab>
                    <Tab>Featurettes</Tab>
                    <Tab>Bloopers</Tab>
                </TabList>

                <TabPanel>{renderVideos(trailers)}</TabPanel>
                <TabPanel>{renderVideos(behindTheScenes)}</TabPanel>
                <TabPanel>{renderVideos(featurettes)}</TabPanel>
                <TabPanel>{renderVideos(bloopers)}</TabPanel>
            </Tabs>
        </div>
    );
};

export default MovieVideos;

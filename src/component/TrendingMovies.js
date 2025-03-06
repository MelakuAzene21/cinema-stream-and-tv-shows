import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick"; // Import carousel package
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./TrendingMovies.css";

const apiKey = "b994fce496fc0f962a6908ff2a4ba539";

export default function TrendingMovies() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
                );
                setTrendingMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="trending-section">
            <h2>🔥 Trending Movies</h2>
            {loading ? (
                <div className="loading-trending">Loading...</div>
            ) : (
                <Slider {...settings}>
                    {trendingMovies.map((movie) => (
                        <div key={movie.id} className="trending-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './TVShowDetail.css'; // Add your styles for this page

// const apiKey = 'b994fce496fc0f962a6908ff2a4ba539'; // Use your TMDB API key here

// const TVShowDetail = () => {
//     const { id } = useParams();
//     const [show, setShow] = useState(null);

//     useEffect(() => {
//         const fetchTVShowDetail = async () => {
//             try {
//                 const response = await axios.get(
//                     `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
//                 );
//                 setShow(response.data);
//             } catch (error) {
//                 console.error('Error fetching TV show details:', error);
//             }
//         };

//         fetchTVShowDetail();
//     }, [id]);

//     if (!show) return <div>Loading...</div>; // You can add a loader here

//     return (
//         <div className="tv-show-detail-container">
//             <div className="tv-show-header">
//                 <img
//                     src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
//                     alt={show.name}
//                     className="tv-show-poster-detail"
//                 />
//                 <div className="tv-show-info-detail">
//                     <h1>{show.name}</h1>
//                     <p>{show.overview}</p>
//                     <p><strong>First Air Date:</strong> {show.first_air_date}</p>
//                     <p><strong>Rating:</strong> {show.vote_average}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TVShowDetail;

import { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './TVShowDetail.css'; // Add your styles for this page
import MovieModal from './MovieModal'; // Assuming MovieModal is used for trailers

const apiKey = 'b994fce496fc0f962a6908ff2a4ba539'; // TMDB API key

const TVShowDetail = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [relatedShows, setRelatedShows] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTVShowDetail = async () => {
            try {
                // Fetch TV show details
                const showResponse = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
                );
                setShow(showResponse.data);

                // Fetch related TV shows
                const relatedResponse = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apiKey}`
                );
                setRelatedShows(relatedResponse.data.results);

                // Fetch trailers if available
                const trailerResponse = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`
                );
                const trailer = trailerResponse.data.results.find(
                    (video) => video.type === 'Trailer'
                );
                if (trailer) {
                    setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
                }
            } catch (error) {
                console.error('Error fetching TV show details:', error);
            }
        };

        fetchTVShowDetail();
    }, [id]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!show) return <div>Loading...</div>; // Loading state

    return (
        <div className="tv-show-detail-container">
            <div className="tv-show-header">
                <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    className="tv-show-poster-detail"
                />
                <div className="tv-show-info-detail">
                    <h1>{show.name}</h1>
                    <p>{show.overview}</p>
                    <p><strong>First Air Date:</strong> {show.first_air_date}</p>
                    <p><strong>Rating:</strong> {show.vote_average}</p>
                    <button onClick={openModal}>Watch Trailer</button>
                </div>
            </div>

            {/* Modal for trailer */}
            <MovieModal trailerUrl={trailerUrl} isOpen={isModalOpen} closeModal={closeModal} />

            {/* Related TV Shows */}
            <div className="related-tv-shows">
                <h2>Related TV Shows</h2>
                <div className="tv-shows-list">
                    {relatedShows.map((relatedShow) => (
                        <div key={relatedShow.id} className="tv-show-card">
                            <Link to={`/tv/${relatedShow.id}`} className="tv-show-link">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${relatedShow.poster_path}`}
                                    alt={relatedShow.name}
                                    className="tv-show-poster"
                                />
                                <div className="tv-show-info">
                                    <h3>{relatedShow.name}</h3>
                                    <p>{relatedShow.overview.slice(0, 100)}...</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TVShowDetail;

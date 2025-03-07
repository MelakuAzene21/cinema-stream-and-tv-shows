// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './TVShows.css'; // Import styles for TV Shows

// const apiKey = 'b994fce496fc0f962a6908ff2a4ba539'; // Use your TMDB API key here

// const TVShows = () => {
//     const [tvShows, setTvShows] = useState([]);

//     useEffect(() => {
//         const fetchTVShows = async () => {
//             try {
//                 const response = await axios.get(
//                     `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
//                 );
//                 setTvShows(response.data.results); // Store the fetched TV shows in state
//             } catch (error) {
//                 console.error('Error fetching TV shows:', error);
//             }
//         };

//         fetchTVShows();
//     }, []); // Only run this effect once

//     return (
//         <div className="tv-shows-container">
//             <h2 className="section-title">Popular TV Shows</h2>
//             <div className="tv-shows-list">
//                 {tvShows.map((show) => (
//                     <div key={show.id} className="tv-show-card">
//                         <Link to={`/tv/${show.id}`} className="tv-show-link">
//                             <img
//                                 src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
//                                 alt={show.name}
//                                 className="tv-show-poster"
//                             />
//                             <div className="tv-show-info">
//                                 <h3>{show.name}</h3>
//                                 <p>{show.overview.slice(0, 100)}...</p> {/* Display only a snippet of the overview */}
//                             </div>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default TVShows;


// import { useEffect, useState } from 'react';
// import { useContext } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './TVShows.css'; // Import styles for TV Shows
// import CastCrew from './CastCrew';
// import SkeletonMovieDetail from './SkeletonMovieDetail';
// import { LanguageContext } from './LanguageContext';
// const apiKey = 'b994fce496fc0f962a6908ff2a4ba539'; // Use your TMDB API key here

// const TVShows = () => {
//     const [tvShows, setTvShows] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const { language } = useContext(LanguageContext); // Get selected language

//     const fetchTVShows = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(
//                 `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=${language}&page=${page}`
//             );
//             setTvShows((prevShows) => [...prevShows, ...response.data.results]);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching TV shows:', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTVShows();
//     }, [page,language]); // Fetch TV shows when page changes

//     return (
//         <div className="tv-shows-container">
//             <h2 className="section-title">Popular TV Shows</h2>
//             <div className="tv-shows-list">
//                 {tvShows.map((show) => (
//                     <div key={show.id} className="tv-show-card">
//                         <Link to={`/tv/${show.id}`} className="tv-show-link">
//                             <img
//                                 src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
//                                 alt={show.name}
//                                 className="tv-show-poster"
//                             />
//                             <div className="tv-show-info">
//                                 <h3>{show.name}</h3>
//                                 <p>{show.overview.slice(0, 100)}...</p> {/* Display only a snippet of the overview */}
//                             </div>
//                         </Link>
//                         <CastCrew movieId={show.id} /> {/* Show Cast for each movie */}

//                     </div>
//                 ))}
//             </div>

//             {/* Load More Button */}
//             {!loading && (
//                 <button className="load-more-btn" onClick={() => setPage((prevPage) => prevPage + 1)}>
//                     Load More TV Shows
//                 </button>
//             )}

//             {loading && <SkeletonMovieDetail/>}
//         </div>
//     );
// };

// export default TVShows;


import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './TVShows.css';
import CastCrew from './CastCrew';
import SkeletonMovieDetail from './SkeletonMovieDetail';
import { LanguageContext } from './LanguageContext';

const apiKey = 'b994fce496fc0f962a6908ff2a4ba539'; // TMDB API Key
const showsPerPage = 20; // Number of TV shows per page

const TVShows = () => {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(false);
    const { language } = useContext(LanguageContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch TV Shows
    useEffect(() => {
        const fetchTVShows = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=${language}&page=${currentPage}`
                );
                setTvShows(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error('Error fetching TV shows:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTVShows();
    }, [currentPage, language]);

    // Handle Page Click
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    return (
        <div className="tv-shows-container">
            <h2 className="section-title">Popular TV Shows</h2>
            <div className="tv-shows-list">
                {loading ? (
                    <SkeletonMovieDetail />
                ) : (
                    tvShows.map((show) => (
                        <div key={show.id} className="tv-show-card">
                            <Link to={`/tv/${show.id}`} className="tv-show-link">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                    alt={show.name}
                                    className="tv-show-poster"
                                />
                                <div className="tv-show-info">
                                    <h3>{show.name}</h3>
                                    <p>{show.overview.slice(0, 100)}...</p>
                                </div>
                            </Link>
                            <CastCrew movieId={show.id} />
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Component */}
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={totalPages > 20 ? 20 : totalPages}
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
        </div>
    );
};

export default TVShows;

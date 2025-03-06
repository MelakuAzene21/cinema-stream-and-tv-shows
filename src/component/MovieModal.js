// // MovieModal.js
// import React, { useState } from 'react';
// import './MovieModal.css';

// const MovieModal = ({ trailerUrl, isOpen, closeModal }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="modal-overlay" onClick={closeModal}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <button className="close-btn" onClick={closeModal}>
//                     &times;
//                 </button>
//                 <iframe
//                     width="100%"
//                     height="400px"
//                     src={trailerUrl}
//                     title="Movie Trailer"
//                     frameBorder="0"
//                     allowFullScreen
//                 ></iframe>
//             </div>
//         </div>
//     );
// };

// export default MovieModal;


import React, { useEffect } from "react";
import "./MovieModal.css";

const MovieModal = ({ trailerUrl, isOpen, closeModal }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        } else {
            document.body.style.overflow = "auto";
        }
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>&times;</button>
                <div className="iframe-container">
                    <iframe
                        src={trailerUrl}
                        title="Movie Trailer"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;

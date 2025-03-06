// MovieModal.js
import React, { useState } from 'react';
import './MovieModal.css';

const MovieModal = ({ trailerUrl, isOpen, closeModal }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>
                    &times;
                </button>
                <iframe
                    width="100%"
                    height="400px"
                    src={trailerUrl}
                    title="Movie Trailer"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default MovieModal;

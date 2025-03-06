import "./SkeletonMovieDetail.css";

const SkeletonMovieDetail = () => {
    return (
        <div className="skeleton-movie-detail">
            <div className="skeleton-movie-image"></div>
            <div className="skeleton-movie-info">
                <div className="skeleton-text large"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
            </div>
        </div>
    );
};

export default SkeletonMovieDetail;

import "./SkeletonLoader.css";

export default function SkeletonLoader() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
        </div>
    );
}

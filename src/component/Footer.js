import "./Footer.css";
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <span className="footer-text">🎬 Movie & TV Show App</span>
                </div>
                <div className="footer-links">
                    <a href="https://my-port-folio-react-git-master-melaku-azenes-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link">About</a>
                    <a href="maileto:melakuazene623Gmail.com" className="footer-link">Contact</a>
                     </div>
                <div className="footer-social">
                    <a href="https://www.linkedin.com/in/melaku-azene-1ba3012b5/" target="_blank" rel="noopener noreferrer" className="footer-social-link">LinkedIn</a>
                    <a href="https://github.com/MelakuAzene21" target="_blank" rel="noopener noreferrer" className="footer-social-link">GitHub</a>
                </div>
            </div>
            <div className="footer-copy">
                &copy; 2024 <span className="highlight">Melaku Azene</span>. All Rights Reserved.
            </div>
        </footer>
    );
}

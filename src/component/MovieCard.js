import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './MovieCard.css'
const IMAGEPATH="https://image.tmdb.org/t/p/w1280";

const moviecard=(props)=>{
    const {data}=props;
    return(
        <div className="card-item">
   <div className="card-inner">
    <div className="card-top">
                    <Link to={`/movie/${data.id}`}>
                        <img src={IMAGEPATH + data.poster_path} alt={data.title} />

                    </Link>
    </div>
    <div className="card-bottom">
        <div className="card=info">
            <h4> Movie Title:   {data.title}</h4>
            <p>Release Date:   {data.release_date}</p>
        </div>
    </div>
   </div>
        </div>
    )
}
export default moviecard
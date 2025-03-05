import { Link } from "react-router-dom"
import mele from '../images/mele.jpg'
import './Header.css'
export default function Header() {
    return (
        <div className="header">
<Link to="/" >
<div className="logo">Movie App</div>
</Link>
<div className="usr-image">
    <img src={mele}  style={{width:100 , height:100}} alt="Mele" className="circle"/>
</div>
        </div>
    )
}
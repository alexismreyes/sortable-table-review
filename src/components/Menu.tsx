import "../assets/Menu.css"
import {NavLink} from "react-router-dom";
const Menu = () =>{

    return(
        <>
    <header>
        <nav className="navbar navbar-expand-lg gold-header">
            <ul  className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                <li className="nav-item"><NavLink to="/sortable" className="nav-link">Sortable table</NavLink></li>
                <li className="nav-item"><NavLink to="/dev" className="nav-link">Developer</NavLink></li>
            </ul>
        </nav>
    </header>
        </>
    )
}
export default Menu;
import React from 'react'
import { Link} from 'react-router-dom'
import '../stylesheets/header.css'
function Header() {

    return (
<header className ='header'>
    <div className ="Logo">
        <Link to="/">Cocktail Capture</Link>
    </div>
    <ul>
        <li>
            <Link to="/Add">Add a cocktail</Link>
        </li>
        <li>
            <Link to="/View">Cocktail List</Link>
        </li>
    </ul>

</header>
    )
}

export default Header
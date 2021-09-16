import React from 'react'
import {Link} from 'react-router-dom';
function NavComponent(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/'>Uber Eats</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/restaurant">Restaurant</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/customer">Customer</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}


export default NavComponent


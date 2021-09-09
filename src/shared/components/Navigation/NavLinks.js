import React, { useContext } from "react"
import { NavLink } from "react-router-dom"

import "./NavLinks.css"
import { AuthContext } from "../../context/auth-context"

export default function NavLinks() {
    const auth = useContext(AuthContext)

    return (
        <ul className="nav-links">
            <li>
                <NavLink exact to="/" >All Auctions</NavLink>
            </li>
            {auth.isLoggedIn && <li>
                <NavLink to={`/${auth.userId}/places`}>My Auctions</NavLink>
            </li>}
            {auth.isLoggedIn && <li>
                <NavLink to="/places/new">Start Auction</NavLink>
            </li>}
            {!auth.isLoggedIn && <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
            }
            {auth.isLoggedIn && <li>
                <NavLink to="/" onClick={auth.logout}>LOGOUT</NavLink>
            </li>}
        </ul>
    )
}
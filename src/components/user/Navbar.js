import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Notification from '../user/Notification';


export default function Navbar(){

    return(
        <div className="navbar">
            <Link className="logo" to="/">Food AT You</Link>
            <div className="navbar__links">
                <NavLink to="/home">HOME</NavLink>
                <NavLink to="/cart">CART</NavLink>
                <NavLink to="/profile">PROFILE</NavLink>
                <Notification />
            </div>
        </div>
    )
}


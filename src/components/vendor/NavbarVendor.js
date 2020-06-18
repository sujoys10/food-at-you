import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import VendorNotification from './VendorNotification';


export default function NavbarVendor(){ 
    return(
        <div className="navbar">
            <Link className="logo" to="/dashboard">Food AT You</Link>
            <div className="navbar__links">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/menu">Menu</NavLink>
                <NavLink to="/vendor-profile">Profile</NavLink>
                <VendorNotification />
            </div>
        </div>
    )
}
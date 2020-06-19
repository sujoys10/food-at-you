import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBottomVendor(){
    return(
        <div className="navBottom">
            <NavLink to="/dashboard" activeClassName="selected">
                <div className="navBottom__item">
                    <i className="material-icons">
                        dashboard
                    </i>
                    <p>Dashboard</p>
                </div>
            </NavLink>
            <NavLink to="/menu" activeClassName="selected">
                <div className="navBottom__item">
                    <i className="material-icons">
                        restaurant_menu
                    </i>
                    <p>Menu</p>
                </div>
            </NavLink>
            <NavLink to="/vendor-profile" activeClassName="selected">
                <div className="navBottom__item">
                    <i className="material-icons">
                        person
                    </i>
                    <p>Profile</p>
                </div>
            </NavLink>
        </div>
    )
}
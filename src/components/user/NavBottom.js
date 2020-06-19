import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBottom(){
    return(
        <div className="navBottom"> 
            <NavLink to="/home" activeClassName="selected">
                <div className="navBottom__item">
                    <i className="material-icons">
                        home
                    </i>
                    <p>Home</p>
                </div>
            </NavLink>
            <NavLink to="/cart" activeClassName="selected">
                <div className="navBottom__item">
                    <i className="material-icons">
                        shopping_basket
                    </i>
                    <p>Cart</p>
                </div>
            </NavLink>
            
            <NavLink to="/profile" activeClassName="selected">
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
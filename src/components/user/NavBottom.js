import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBottom(){
    return(
        <div className="navBottom"> 
            <NavLink to="/home">
                <div className="navBottom__item">
                    <i className="material-icons">
                        home
                    </i>
                    <p>Home</p>
                </div>
            </NavLink>
            <NavLink to="/cart">
                <div className="navBottom__item">
                    <i className="material-icons">
                        shopping_basket
                    </i>
                    <p>Cart</p>
                </div>
            </NavLink>
            
            <NavLink to="/profile">
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
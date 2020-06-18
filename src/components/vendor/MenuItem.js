import React, { memo, lazy } from 'react';
import { Link } from 'react-router-dom'
import fay from '../../images/fay.jpg';

const ItemAvailablity = lazy(() => import('./ItemAvailablity'));

const MenuItem =  memo(function MenuItem({item: {
    id,
    name,
    type,
    url,
    category,
    price,
    is_available
}}){
    
    return (
        <div className="menuItemCard box-shadow">
            <div className="menuItemCard__subContainer">
                <div className="menuItemCard__image">
                    <img src={url? url: fay} alt={name} />
                </div>
                <div className="menuItemCard__info">
                    <p className="menuItemCard__info--category">{category}</p>
                    <p>&#8377;{price}</p>
                    <p className="menuItemCard__info--name">{name}</p>
                </div>
            </div>
            <div className="menuItemCard__subContainer2">
                <Link 
                    className="menuItemCard__edit button-r"
                    to={`/editItem/${id}`}
                >
                    EDIT
                </Link>
                <ItemAvailablity 
                    className="menuItemCard_inStock"
                    itemId={id}
                    inStock={is_available}
                />
            </div>
            <p className="menuItemCard__type border-b">{type}</p>
        </div>
    )
})

export default MenuItem;



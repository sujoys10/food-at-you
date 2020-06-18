import React from 'react';
import fay from '../../images/fay.jpg';

export default function ItemCard({item: { name, category, url, price, rating }}){
    return(
        <div className="itemCard">
            <div className="itemCard__img">
                    <img
                     alt={name}
                     src={url? url: fay}
                    />
            </div>
            <div className="itemCard__info">
                <p className="itemCard__name">{name}</p>
                <div className="itemCard__category">
                    <span className="material-icons">
                        local_offer
                    </span>
                    <p>{category}</p>
                </div>
                <p className="itemCard__price">&#8377;{price}</p>
            </div>
        </div>
    )
}
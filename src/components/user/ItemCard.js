import React from 'react';
import { ImageMd } from '../Image';

export default function ItemCard({item: { name, category, url, price, is_available, rating }}){
    return(
        <div className="itemCard" style={{ opacity: is_available ? '1' : '0.5' }}>
            <div className="itemCard__img">
                <ImageMd url={url}/>
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
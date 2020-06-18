import React from 'react';
import { getLocalDate } from  '../utils/date';

export default function OrderBag({ bag: {
    type,
    status,
    delivery_date,
    items
} }){
    return(
        <div className="card-container">
            <div className="orderBag__subcontainer1">
                <p className="orderBag__type">{type}</p>
                <p className="orderBag__status button-border-b">{status}</p>
            </div>            
            <hr className="hr"></hr>
            <div className="orderBag__details">
                <div>
                    <p className="bag__title">items</p>
                    <div className="orderBag__items">
                        {
                            items.map((item, index) => (
                                <p className="bag__content orderBag__itemName" key={index}>
                                {item.item.name}: {item.quantity} X {item.item.price} 
                                </p>
                            ))
                        }
                    </div>
                </div>    
                <div className="orderBag__deliveryTime">
                    <p className="bag__title">Delivery Time</p> 
                    <span className="bag__content">{getLocalDate(delivery_date)}</span>
                </div>
            </div>
        </div>
    )
}
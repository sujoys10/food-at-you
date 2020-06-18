import React, { memo, lazy } from 'react';
import { getDeliveryTime } from "../../utils/date";

const UpdateStatus = lazy(() => import('./UpdateStatus'));

const DeliveryBag = memo(function DeliveryBag({ bag: {
    id,
    type,
    status,
    items
} }) {
    return(
        <div className="card-container deliveryBag">
            <div className="deliveryBag__subcontainer1">
                <p className="deliveryBag__type">{type}</p>
                <p className="deliveryBag__status button-border-r">{status}</p>
            </div>            
            <hr className="hr"></hr>
            <div className="deliveryBag__details">
                <div>
                    <p className="bag__title">items</p>
                    <div className="deliveryBag__items">
                        {
                            items.map((item, index) => (
                                <p className="bag__content deliveryBag__itemName" key={index}>
                                {item.item.name}: {item.quantity} X {item.item.price} 
                                </p>
                            ))
                        }
                    </div>
                </div>    
                <div className="deliveryBag__deliveryTime">
                    <i className="material-icons">
                        schedule
                    </i> 
                    <span className="bag__content">{getDeliveryTime(type)}</span>
                </div>
            </div>
            <div className="deliveryBag__updateStatus">
                    <UpdateStatus id={id} bagStatus={status} />
            </div>
        </div>
    )
    
})

export default DeliveryBag;
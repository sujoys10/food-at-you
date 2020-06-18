import React from 'react';

export default function OrderItemType({ items, }){
    return(
        <div style={{ border: '1px solid blue'}}>
            <div>
                <h3>{items[0].type}</h3>
                <p>{items[0].status}</p>
            </div>
            <div>
                {
                    items.map(item => (
                        <p key={item.id}>
                        {item.item.name}: {item.quantity} X {item.item.price} 
                        </p>
                    ))
                }
            </div>  
        </div>
    )
}
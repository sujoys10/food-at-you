import React, { lazy } from 'react';
const OrderCard = lazy(() => import('./OrderCard'));

export default function YourOrder({ orders }){
    return(
        <div className="yourOrder">
            <p className="yourOrder__header">Your Orders</p>
            
            <div className="yourOrder__orders">
                {
                    orders.length === 0 ?
                        <div className="msg">No Orders to show</div>
                        : (
                            orders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        )
                }
            </div>
        </div>
    )
}
import React, { useState, useEffect, lazy, Suspense }  from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { TOGGLE_CART } from '../../library/mutation';
import { getToday, getDeliveryDate } from '../../utils/date';
const Spinner = lazy(() => import('../Spinner'));

export default function AddToCart({id, type, isInCart, inStock}){
    const [inCart, setInCart] = useState(isInCart);
    const [timeOver, setTimeOver] = useState(false);
    const [ mutation, { loading, error}] = useMutation(
        TOGGLE_CART
    );

    const orderForToday = () => {
       setInCart(!inCart);
        mutation({
            variables: {
                itemId: id
            }
        })
    }

    useEffect(() => {
        const now = getToday();
        const delivery_date = getDeliveryDate(0,type);
        
        //check if the delivery time is passed
        if(now > delivery_date){
            setTimeOver(true);
        }
    },[type])

    if(loading) return <Spinner height="20px" width="20px"/>
    if(error) return console.log(error.message)
    return (
        <Suspense fallback={<Spinner />}>
            <div>
                {
                    inCart ? (
                        <Link className="item__cart-btn" to="/cart">Go To Cart</Link>
                    ): (
                        <button
                            className="addToCart_button item__cart-btn" 
                            disabled={!inStock || timeOver || !!loading || !!error}
                            onClick={orderForToday}
                        >
                            { inStock ? 
                            timeOver ? 
                            'Not Available' : 'Add To Cart' 
                            : 'Out Of Stock'
                            }
                        </button>
                    )   
                }
            </div>
        </Suspense>
    )
}
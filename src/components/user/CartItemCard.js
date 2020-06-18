import React, { memo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { TOGGLE_CART } from '../../library/mutation';
import { getDeliveryTime } from '../../utils/date';
import placeholder from '../../images/placeholder.jpg';
import Spinner from '../Spinner';

const CartItemCard = memo(function({
     cartItem: { 
         id,
         type,
         name,
         url,
         price,
         is_available,
         isTimePassed
      }
    }){
    
    const [ mutation, { loading, error }] = useMutation(
        TOGGLE_CART
    )
    
    const removeItemFromCart = () => {
        mutation({
            variables: {
                itemId: id
            }
        })
    }

    if(loading) return <Spinner cStyle="spinner--page"/>
    if(error) throw new Error(error.message)
    return(
        <div className="cartItem">
            <div>
                <div className="cartItem__info">
                    <div className="cartItem__box">
                        <p className="cartItem__type">{type}</p>
                        <p className="cartItem__name">{name}</p>
                        <p><span className="cartItem__title">&#8377; </span>{price}</p>
                    </div>
                    
                    <div className="cartItem__image">
                        <img alt={name} src={url? url : placeholder} />
                    </div>
                    
                </div>
                <div className="cartItem__box"> 
                    { is_available ? 
                        isTimePassed ? 
                            <p>Not available now</p>:(
                                <p><span className="cartItem__title">Delivery Time: </span>{getDeliveryTime(type)}</p>
                            )
                        :  <p>Out Of Stock</p>  
                    }
                </div>
            </div>
            <div className="cartItem__remove button-w" onClick={removeItemFromCart}>
                Remove
            </div>
        </div>
    )
})

export default CartItemCard;


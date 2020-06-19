import React, { Suspense, lazy } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { GET_CART_ITEMS, GET_CART_ITEMS_DETAILS } from '../../library/query';
import { calculateTotal } from '../../utils/calculateTotal';
import Layout from '../../components/user/Layout';
import NavBottom from '../../components/user/NavBottom';
import { SpinnerLayout } from '../../components/Spinner';
import ErrorBoundary from '../../components/ErrorBoundary';

const CartItemCard = lazy(() => import('../../components/user/CartItemCard'));

export default function Cart(){ 
    const history = useHistory();  
    const { data: { cartItems } } = useQuery(GET_CART_ITEMS);
    const { data, loading, error } = useQuery(
        GET_CART_ITEMS_DETAILS,
        {
            variables: {
                filter: {
                    idList: cartItems
                }
            }
        }
    );

    const isDisabled = () => {
        //check if there is any item eligble for order 
        const isExist = data &&
                        data.items
                            .find(item =>
                                 !item.isTimePassed && item.is_available
                                );
        return !isExist;
    }

    if(loading) return <SpinnerLayout />
    if(error) throw new Error(error.message);
    return(
        <Suspense fallback={<SpinnerLayout />}>
            <ErrorBoundary>
                <Layout>
                    {data.items.length === 0 ?
                        <div className="msg">No Item in Cart</div> :
                        (<div>
                            <div className="cartItems">
                                {data.items.map(item => (
                                    <CartItemCard 
                                        key={item.id}
                                        cartItem={item}
                                    />
                                ))}
                            </div>
                            <div className="cart__orderBar">
                                <p className="border-b">Total: &#8377;{calculateTotal(data.items)}</p>
                                <button
                                    onClick={() => history.push("/place-order")} 
                                    className="cart__placeOrder"
                                    disabled={isDisabled()}
                                >
                                    Place Order
                                </button> 
                            </div>
                        </div>)
                    }
                    <NavBottom />
                </Layout>
            </ErrorBoundary>
        </Suspense>
    )
}


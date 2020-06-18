import React, { useState, Suspense, Fragment, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_DETAILS_FOR_ORDER, GET_USER, GET_CART_ITEMS } from '../../library/query';
import { PLACE_ORDER } from '../../library/mutation';
import { calculateTotal } from '../../utils/calculateTotal';
import { getDeliveryDate, getToday } from '../../utils/date';
import  { SpinnerLayout } from '../../components/Spinner';
import Layout from '../../components/user/Layout';
import NavBottom from '../../components/user/NavBottom';
import ErrorBoundary from '../../components/ErrorBoundary';


export default function Order(){
    const [orderBag, setOrderBag] = useState([]);
    const [address, setAddress] = useState('');
    const [ placed, setPlaced] = useState(false);
    const vendor = JSON.parse(localStorage.getItem('vendor'));
    const { data : { currentUser } } = useQuery(GET_USER);
    const { data: { cartItems } } = useQuery(GET_CART_ITEMS);

    const { data, loading, error } = useQuery(
        GET_DETAILS_FOR_ORDER,
        {
            variables: {
                filter: {
                    idList: cartItems
                }
            }
        }
    );
    const [ mutation, { loading: loadingMutation, error: errorMutation }] = useMutation(
        PLACE_ORDER,
        { 
            onCompleted(){
                localStorage.removeItem('cart');
                setPlaced(true);
            }
        }
    )

    useEffect(() => {
        if(data){
            const items = data.items.filter(item => !item.isTimePassed && item.is_available);
            setOrderBag(items);
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderedItems = [];
           orderBag.map(item =>  
                orderedItems.push({
                    item: item.id,
                    type: item.type,
                    quantity: 1,
                    delivery_date: getDeliveryDate(0, item.type)
            })
        )
        const total = calculateTotal(data.items);  
        mutation({
            variables: {
                input: {
                    customer: currentUser,
                    vendor: vendor.value,
                    total,
                    order_date: getToday(),
                    delivery_address: address,
                    orderedItems   
                }
            }
        })

    }

    if(loading || loadingMutation) return <SpinnerLayout />
    if(error) throw new Error(error.message);
    if(errorMutation) throw new Error(errorMutation.message);
    return(
        <Suspense fallback={<SpinnerLayout />}>
            <ErrorBoundary>
                <Layout>
                    <div className="order">
                        { placed ? (
                            <Fragment>
                                <h1 className="order__title">Order Placed</h1>
                                <Link className="button-border-r" to="/home">Go to Home</Link>
                            </Fragment>
                        ): (
                            <form 
                                className="order__form"
                                onSubmit={handleSubmit}
                            >
                                <label htmlFor="address">Delivery Address</label>
                                <input
                                    name="address" 
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <button type="submit">Place Order</button>
                            </form>
                        )}
                    </div>
                    <NavBottom />
                </Layout> 
            </ErrorBoundary>
        </Suspense> 
    )
}
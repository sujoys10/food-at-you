import React, { Suspense, lazy, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_ITEM } from '../../library/query';
import { ITEM_SUBSCRIPTION } from '../../library/subscription';
import { getDeliveryTime } from '../../utils/date';
import fay  from '../../images/fay.jpg';

import Layout from '../../components/user/Layout';
import { SpinnerLayout } from '../../components/Spinner';
const AddToCart = lazy(() => import('../../components/user/AddToCart'));

export default function Item(){
    const { id } = useParams();
    const { data, loading, error, subscribeToMore } = useQuery(
        GET_ITEM,
        {
            variables: {
                filter: { id }
            }
        }
    );

    const subscribeToUpadateItem = useCallback(subscribeToMore => {
        subscribeToMore({
            document: ITEM_SUBSCRIPTION,
            variables: { filter: { id } }
        })
    }, [id])

    useEffect(() => {
        subscribeToUpadateItem(subscribeToMore);
    }, [subscribeToMore, subscribeToUpadateItem])
    
    if(loading) return <SpinnerLayout />
    if(error) throw new Error(error.message);
    return(
        <Suspense fallback={<SpinnerLayout />}>
            <Layout>
                {
                    data.items.length !== 0 && (
                        <div className="item">
                            <p className="item__name">{data.items[0].name}</p>
                            <div className="item__image_container">
                                <div className="item__image">
                                    <img alt={data.items[0].name} 
                                        src={data.items[0].url ? data.items[0].url : fay} 
                                    />
                                </div>    
                            </div>
            
                            <div className="item__info">
                                <div className="item__subContainer">
                                    <p className="item__price">
                                        &#8377; {data.items[0].price}
                                    </p>
                                    
                                    <div className="item__deliverTime">
                                        <i className="material-icons item__timeIcon">
                                            schedule
                                        </i>
                                        <p>{getDeliveryTime(data.items[0].type)}</p>
                                    </div>
                                </div>

                                <hr className="hr item__hr"></hr>
     
                                <div className="item__description">
                                    <div className="item__description--header">
                                        <p>Description</p>
                                        <div className="item__category">
                                            <span className="material-icons">
                                                local_offer
                                            </span>
                                            <p>{data.items[0].category}</p>
                                        </div>
                                    </div>
                                    <p>{data.items[0].description}</p>
                                </div>                                
                            </div>
                            <AddToCart 
                                    id={id}
                                    type={data.items[0].type}
                                    inStock={data.items[0].is_available}
                                    isInCart={data.items[0].isInCart} 
                                />    
                        </div>
                    )
                }
            </Layout>
        </Suspense>
    )
}
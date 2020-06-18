import React, { useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_LATEST_BAG, GET_USER } from '../../library/query';
import { ORDERBAG_SUBSCRIPTION } from '../../library/subscription';
import { getDeliveryTime } from '../../utils/date';
import Spinner from '../Spinner';
import ErrorBoundary from '../ErrorBoundary';


export default function StatusBoard(){
    const { data: { currentUser } } = useQuery(GET_USER);
    const { data, loading, error, subscribeToMore} = useQuery(
        GET_LATEST_BAG,
        
        {
            variables: {
                filter: {
                    customer: currentUser
                },
                orderBy: "delivery_date_ASC",
                first: 1
            },
        }
    )

    const subscribeToDeliveryBagUpdate = subscribeToMore => {
        subscribeToMore({
            document: ORDERBAG_SUBSCRIPTION,
            variables: { filter: { id: data.deliveryBag[0].id } },
        })
    } 
    

    useEffect(() => {
        if(data){
            data.deliveryBag.length !==0 && subscribeToDeliveryBagUpdate(subscribeToMore);
        }
    })

    /*  const subscribeToDeliveryBagUpdate = useCallback(subscribeToMore => {
            subscribeToMore({
                document: ORDERBAG_SUBSCRIPTION,
                variables: { filter: { id: data.deliveryBag.id } },
            })
    }, [data]) */

    if(loading) return <Spinner cStyle="center" dheight={"110px"} width={"110px"}  />
    if(error) throw new Error(error.message);
    return(
        <ErrorBoundary>
            <div className="statusBoard">
                { data.deliveryBag.length !== 0 && (
                    <Fragment>
                        <p className="container__header">Upcoming Order</p>
                        <div className="statuBoard__details  box-shadow">
                            <p className="statusBoard__type">{data.deliveryBag[0].type}</p>
                            <div className="statusBoard__items">
                                {
                                    data.deliveryBag[0].items.map((item, index) => (
                                        <p className="bag__content orderBag__itemName" key={index}>
                                            {item.item.name}: {item.quantity} X {item.item.price} 
                                        </p>
                                    ))
                                }
                            </div>
                            <p className="statusBoard__status">{data.deliveryBag[0].status}</p>
                            <p className="statusBoard__time">
                                <span className="material-icons statusBoard__time--icon">
                                schedule
                                </span>
                                {getDeliveryTime(data.deliveryBag[0].type)}
                            </p>
                        </div>
                    </Fragment>
                    
                )}
                
            </div>
        </ErrorBoundary> 
    )
}
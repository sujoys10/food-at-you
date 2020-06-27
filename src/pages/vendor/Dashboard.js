import React, { lazy, useState, useEffect, Fragment, Suspense } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filterOrderBags } from '../../utils/filterOrdersByType';
import { getDefaultType } from '../../utils/date';
import { GET_ORDER_BAGS, GET_USER } from '../../library/query';
import { ORDERBAG_SUBSCRIPTION } from '../../library/subscription';
import { SpinnerLayoutVendor } from '../../components/Spinner';
import ErrorBoundary from '../../components/ErrorBoundary';
import VendorLayout from '../../components/vendor/VendorLayout';

const DeliveryBagList = lazy(() => import('../../components/vendor/DeliveryBagList'));

export default function Dashboard(){
    const [ type, setType ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ orderBags, setOrderBags ] = useState([]);
    const { data : { currentUser } } = useQuery(GET_USER);
    const { data, loading, error, subscribeToMore } = useQuery(
        GET_ORDER_BAGS,
        {
            variables: {
                filter: {
                    vendor: currentUser,  
                },
                orderBy: "delivery_date_ASC"
            }
        }
    )

    useEffect(() => {
        let unsubscribe;
        if(!unsubscribe){
            unsubscribe = subscribeToMore({
                document: ORDERBAG_SUBSCRIPTION,
                variables: { filter: { vendor: currentUser } },
                updateQuery: ( prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newBag = subscriptionData.data.subscribeToOrderBag;
                    const exists = prev.orderBags.find(({ id }) => id === newBag.id);
                    if (exists) return prev;
                    prev.orderBags = [...prev.orderBags, newBag]
                    return prev;
                }
            })
        }

        return () => {
           if(unsubscribe){
            unsubscribe();
           } 
        }
    }, [subscribeToMore, currentUser])

    useEffect(() => {
        const defaultType = getDefaultType();
        setType(defaultType);
        if(!!data){
            const filteredBags = filterOrderBags(data.orderBags, defaultType);
            setOrderBags(filteredBags);
        }
        
    }, [data])

    const handleTypeChange = (e) => {
        setType(e.target.value);
        setStatus('');
        const filteredBags = filterOrderBags(data.orderBags, e.target.value);
        setOrderBags(filteredBags);
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
        const filteredBags = filterOrderBags(data.orderBags, type, e.target.value);
        setOrderBags(filteredBags);
    }

    if(loading) return <SpinnerLayoutVendor />
    if(error) throw new Error(error.message);
    return(
        <Suspense fallback={<SpinnerLayoutVendor />}>
            <ErrorBoundary>
                <VendorLayout> 
                    <div className="dashboard">
                        <p className="dashboard__heading page-header page-title box-shadow">Dashboard</p>
                        { data &&
                            data.orderBags.length === 0?
                                <div>
                                    <p className="msg">No Orders Yet For Today</p>
                                </div> :(
                                    <Fragment>
                                        <div className="dashboard__filter">
                                            <select value={type} onChange={handleTypeChange}>
                                                <option value="BREAKFAST">Breakfast</option>
                                                <option value="LUNCH">Lunch</option>
                                                <option value="SNACKS">Snacks</option>
                                                <option value="DINNER">Dinner</option>
                                            </select>

                                            <select value={status} onChange={handleStatusChange}>
                                                <option value="">Status</option>
                                                <option value="PLACED">Placed</option>
                                                <option value="ACCEPTED">Accepted</option>
                                                <option value="CANCELLED">Cancelled</option>
                                                <option value="DELIVERED">Delivered</option>
                                            </select>
                                        </div>

                                        <DeliveryBagList bags={orderBags}/>   
                                    </Fragment>
                                )
                        }
                    </div>
                </VendorLayout>
            </ErrorBoundary>
        </Suspense>
    )
}
import React, { useEffect, useState, useCallback, Fragment, lazy, Suspense } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_VENDOR_ITEMS } from '../../library/query';
import { filterItems } from '../../utils/filterItem';
import { ITEM_SUBSCRIPTION } from '../../library/subscription';
import Spinner from '../Spinner';

const Section = lazy(() => import('./Section'));

export default function MealGallery({ vendorID }){
    const [foodItems, setFoodItems] = useState({})
    const { data, loading, error, subscribeToMore } = useQuery(
        GET_VENDOR_ITEMS,
        {
            variables: {
                filter: {
                    vendorID: vendorID
                }
        }}
    )

    const subscribeToUpdateItems = useCallback(subscribeToMore => {
        subscribeToMore({
            document: ITEM_SUBSCRIPTION,
            variables: { filter: { vendor: vendorID } },
            updateQuery: ( prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newItem = subscriptionData.data.subscribeToItem;
                const exists = prev.items.find(({ id }) => id === newItem.id);
                if (exists) return prev;
                prev.items = [...prev.items, newItem]
                return prev;
            }
        })
    },[vendorID])

    useEffect(() => {
        vendorID && subscribeToUpdateItems(subscribeToMore);
    }, [vendorID, subscribeToMore, subscribeToUpdateItems])

    useEffect(() => {
        if(data){
            setFoodItems(filterItems(data.items))
        }
    }, [data])

    if(loading) return <Spinner cStyle="center" dheight={"300px"} width={"300px"}  />
    if(error) throw new Error(error.message)
    return(
        <Suspense fallback={<Spinner cStyle="center" dheight={"300px"} width={"300px"}  />}>
            <div className="container">
                {data && (
                    <Fragment>
                        {foodItems.breakfast && foodItems.breakfast.length !== 0 && <Section title={"breakfast"} items={foodItems.breakfast} />}
                        {foodItems.lunch && foodItems.lunch.length !== 0 && <Section title={"lunch"} items={foodItems.lunch} />}
                        {foodItems.snacks && foodItems.snacks.length !== 0 && <Section title={"snacks"} items={foodItems.snacks} />}
                        {foodItems.dinner && foodItems.dinner.length !== 0 && <Section title={"dinner"} items={foodItems.dinner} />}
                    </Fragment>
                )}
            </div>
        </Suspense>
    )
}
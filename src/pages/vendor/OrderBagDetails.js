import React, { Suspense } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

export default function OrderBagDetails(){
    const { id } = useParams();
    const { data, loading, error } = useQuery(
        GET_ORDER_BAGS,
        {
            variables: {
                filter: { id }
            }
        }
    )

    if(loading) return <div>Loading...</div>
    if(error) return <div>error {error.message}</div>
    return(
        <Suspense fallback={<div>Loading...</div>}>
            {console.log(data)}
            
        </Suspense>
    )
}
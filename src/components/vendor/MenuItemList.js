import React, { lazy, Suspense } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_VENDOR_ITEMS, GET_USER } from '../../library/query';
import Spinner from '../Spinner';
const MenuItem = lazy(() => import('./MenuItem'));

export default function MenuItemList(){
    const { data : { currentUser } } = useQuery(GET_USER);

    const { data, loading, error } = useQuery(
        GET_VENDOR_ITEMS,
        {
            variables: {
                filter: {
                    vendorEmail: currentUser
                },
                orderBy: "type_ASC"
        }}
    )

    if(loading) return <Spinner />
    if(error) throw new Error(error.message);
    return(
        <Suspense fallback={<Spinner cStyle="center" dheight={"300px"} width={"300px"}  />}>
            <div className="menuItem">
                {
                    data.items.length === 0 ?
                        <p className="msg">No Items added</p>
                        : data.items.map(item => <MenuItem key={item.id} item={item}/>)
                }
            </div>
        </Suspense>
    )
}
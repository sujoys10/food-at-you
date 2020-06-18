import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { REMOVE_ITEM } from '../../library/mutation';
import { GET_VENDOR_ITEMS, GET_USER } from '../../library/query';
import { SpinnerLayoutVendor } from '../Spinner';


export default function RemoveItem({id}){
    const history  = useHistory();
    const { data : { currentUser } } = useQuery(GET_USER);
    const [mutation, { loading, error }] = useMutation(
        REMOVE_ITEM,
        {
            update(cache, { data: { removeItem }}){
                try{
                    const data = cache.readQuery({
                            query: GET_VENDOR_ITEMS,
                            variables: {
                                filter: {
                                    vendorEmail: currentUser
                                },
                                orderBy: "type_ASC"
                            }
                    })
                    data.items = data.items.filter(item =>
                        item.id !== removeItem.id
                    )
                    cache.writeQuery({
                        query: GET_VENDOR_ITEMS,
                        variables: {
                            filter: {
                                vendorEmail: currentUser
                            },
                            orderBy: "type_ASC"
                        },
                        data        
                    })
                }catch(error){
                    throw new Error(error.message);
                }
            },
            onCompleted(){
                history.push('/menu');
            }
        }
    )

    const handleRemove = () => {
        mutation({
            variables: { id }
        })
    }
    if(loading) return <SpinnerLayoutVendor />
    if(error) throw new Error(error.message)
    return (
        <button 
            className="button-w"
            onClick={handleRemove}
        >
            Remove
        </button>
    )
}
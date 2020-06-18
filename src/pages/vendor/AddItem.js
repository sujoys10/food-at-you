import React, { Suspense, lazy } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { CREATE_ITEM } from '../../library/mutation';
import { GET_VENDOR_ITEMS, GET_USER } from '../../library/query';
import { SpinnerLayoutVendor } from '../../components/Spinner';
import VendorLayout from '../../components/vendor/VendorLayout';
import ErrorBoundary from '../../components/ErrorBoundary';

const  ItemForm = lazy(() => import('../../components/vendor/ItemForm'));

export default function AddItem(){
    const history = useHistory();
    const { data : { currentUser } } = useQuery(GET_USER);

    const [mutation, { loading, error }] = useMutation(
        CREATE_ITEM,
        {   
            update(cache, { data: { createItem }}){
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
                    console.log({data, createItem})
                    data.items = [createItem,...data.items ]
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
            onCompleted({createItem}){
                history.push('/menu');
            }
        }
    )
    if(loading) return <SpinnerLayoutVendor />
    if(error) throw new Error(error.message);
    return(
        <Suspense fallback={<SpinnerLayoutVendor />}>
            <ErrorBoundary>
                <VendorLayout>
                    <div className="addItem">
                        <p className="page-header page-title box-shadow">Add Items</p>
                        <ItemForm mutation={mutation}/>
                    </div>
                </VendorLayout> 
            </ErrorBoundary>  
        </Suspense>
    )
}
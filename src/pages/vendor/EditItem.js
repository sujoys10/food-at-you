import React, { lazy, Suspense } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import { GET_VENDOR_ITEMS } from '../../library/query';
import { UPDATE_ITEM } from '../../library/mutation';
import { SpinnerLayoutVendor } from '../../components/Spinner';
import VendorLayout from '../../components/vendor/VendorLayout';
import ErrorBoundary from '../../components/ErrorBoundary';

const  ItemForm = lazy(() => import('../../components/vendor/ItemForm'));
const  RemoveItem = lazy(() => import('../../components/vendor/RemoveItem'));


export default function EditItem(){
    const { id } = useParams();
    const history = useHistory();
    const { data, loading, error } =useQuery(
        GET_VENDOR_ITEMS,
        {variables: {
            filter: { id }
        }}
    );

    const [mutation] = useMutation(
        UPDATE_ITEM,
        {
            onCompleted(){
                history.push('/menu');
            }
        }
    );
    if(loading) return <SpinnerLayoutVendor />
    if(error) throw new Error(error.message);
    return (
        <Suspense fallback={<SpinnerLayoutVendor />}>
            <ErrorBoundary>
                <VendorLayout>
                    <div>
                        <div className="editItem__heading page-header box-shadow">
                            <p className="page-title">Edit Item</p>
                            <RemoveItem id={data.items[0].id} />
                        </div>
                        <ItemForm
                            formType={"edit"} 
                            details={data.items[0]}
                            mutation={mutation}
                        />
                    </div>
                </VendorLayout>
            </ErrorBoundary>
        </Suspense>
    )

}
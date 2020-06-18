import React, { Suspense, lazy } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_VENDOR_DETAILS, GET_USER } from '../../library/query';
import { SpinnerLayoutVendor } from '../../components/Spinner';
import VendorLayout from '../../components/vendor/VendorLayout';
import NavBottomVendor from '../../components/vendor/NavBottomVendor';


const ProfileDetails = lazy(() => import('../../components/ProfileDetails'));
const YourOrder = lazy(() => import('../../components/YourOrder'));


export default function Profile(){
    const { data : { currentUser } } = useQuery(GET_USER);
    const { data, loading, error } = useQuery(
        GET_VENDOR_DETAILS,
        {
            variables: {
                filter: {
                    email: currentUser
                },
                orderBy: 'order_date_DESC',
                bagOrderBy: 'delivery_date_DESC'
            }
        }
    );

    if(loading) return <SpinnerLayoutVendor />
    if(error) throw new Error(error.message);
    return(
        <div>
            <Suspense fallback={<SpinnerLayoutVendor />}>
                <VendorLayout>
                    <div className="profile">
                        <ProfileDetails 
                            name={data.vendors[0].name}
                            email={data.vendors[0].email}
                        />
                        <div>
                            <YourOrder orders={data.vendors[0].orders}/>
                        </div>
                    </div>
                    <NavBottomVendor />
                </VendorLayout>
            </Suspense>
        </div>
    )
}
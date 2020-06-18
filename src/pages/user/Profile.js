import React, { Suspense, lazy } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PROFILE_DETAILS, GET_USER } from '../../library/query';
import  { SpinnerLayout } from '../../components/Spinner';
import Layout from '../../components/user/Layout';
import NavBottom from '../../components/user/NavBottom';

const ProfileDetails = lazy(() => import('../../components/ProfileDetails'));
const YourOrder = lazy(() => import('../../components/YourOrder'));

export default function Profile(){
    const { data : { currentUser } } = useQuery(GET_USER);
    const { data, loading, error } = useQuery(
        GET_PROFILE_DETAILS,
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


    if(loading) return <SpinnerLayout />
    if(error) throw new Error(error.message);
    return(
        <Suspense fallback={<SpinnerLayout />}>
            <Layout>
                <div className="profile">
                    <ProfileDetails 
                        name={data.users[0].name}
                        email={data.users[0].email}
                    />
                    <YourOrder
                        orders={data.users[0].orders}
                    />
                </div>
                <NavBottom />
            </Layout>
        </Suspense>
    )
}
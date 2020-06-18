import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Layout from '../components/user/Layout';


export default function Unauthorized(){
    return(
        <Suspense fallback={<Spinner className="spinner--page"/>}>
            <Layout>
                <p className="msg">You are not authorized to visit the page</p>
                <Link className="border-r .home--link" to="/">Home</Link>
            </Layout>
        </Suspense>
    )
}
import React, { lazy, Suspense } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
const Layout = lazy(() => import('../components/user/Layout'));

export default function NotFound(){
    return(
        <Suspense fallback={<Spinner className="spinner--page"/>}>
            <Layout>
                <div className="msg">404 Not Found</div>
                <Link className="border-r .home--link" to="/">Home</Link>
            </Layout>
        </Suspense>
    )
}
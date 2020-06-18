import React, { Suspense, lazy } from 'react';
import fay_icon  from '../images/fay_icon.jpg'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Authentication = lazy(() => import('../components/Authentication'));

export default function Auth(){
    return(
        <Suspense fallback={<Spinner cStyle="spinner--page" />}>
            <div className="auth">
                <div className="navbar">
                    <Link className="logo" to="/">Food AT You</Link>
                </div>
                <div className="auth__image">
                    <img src={fay_icon} alt="FAY"/>
                </div>
                <Authentication />
            </div>
        </Suspense>
    )
}
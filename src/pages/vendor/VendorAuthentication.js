import React, { useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const VendorLoginForm = lazy(() => import('../../components/vendor/VendorLoginForm '));
const VendorSignupForm = lazy(() => import('../../components/vendor/VendorSignupForm'));


export default function VendorAuthentication(){
    const [oldUser, setOldUser] = useState(true);
    return (
        <div>
            <Suspense fallback={<Spinner />}>
                {oldUser ? <VendorLoginForm /> : <VendorSignupForm />}
                <div
                    onClick={() => setOldUser(!oldUser)}
                >
                    {oldUser
                        ? 'need to create an account?' : 
                         'already have an account?'
                    }
                </div>
                <Link to='/'>Login as User</Link>
            </Suspense>
        </div>
    )
}


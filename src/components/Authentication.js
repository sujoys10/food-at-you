import React, { useState, Suspense, lazy, Fragment } from 'react';
import Spinner from './Spinner';

const LoginForm = lazy(() => import('./user/LoginForm'));
const SignupForm = lazy(() => import('./user/SignupForm'));
const VendorLoginForm = lazy(() => import('./vendor/VendorLoginForm '));
const VendorSignupForm = lazy(() => import('./vendor/VendorSignupForm'));

const Authentication = () => {
    const [role, setRole] = useState('user');
    const [oldUser, setOldUser] = useState(true);

    const switchUser = (role) => {
        setOldUser(true);
        setRole(role);
    }
    return (
        <Suspense fallback={<Spinner />}>
            <div className="authentication">
            {role === 'user'? (
                <Fragment>
                    {oldUser ? <LoginForm /> : <SignupForm />}
                    <div className="authentication__switch--authType"
                        onClick={() => setOldUser(!oldUser)}
                    >
                        {oldUser
                            ? 'Need to create an account?' : 
                            'Already have an account?'
                        }
                    </div>
                    <button className="authentication__switchRoleBtn" onClick={() => switchUser('vendor')}>
                        Login as Vendor
                    </button>
                </Fragment>
            ) : (
                <Fragment>
                    {oldUser ? <VendorLoginForm /> : <VendorSignupForm />}
                    <div className="authentication__switch--authType"
                        onClick={() => setOldUser(!oldUser)}
                    >
                        {oldUser
                            ? 'Need to create an account?' : 
                            'Already have an account?'
                        }
                    </div>
                    <button className="authentication__switchRoleBtn" onClick={() => switchUser('user')}>
                            Login as User
                    </button>
                </Fragment>
                ) } 
            </div>
        </Suspense>
    )
}

export default Authentication;


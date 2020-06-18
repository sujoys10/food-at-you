import React from 'react';
import { Link } from 'react-router-dom';
import VendorLayout from './vendor/VendorLayout';
import NavBottomVendor from './vendor/NavBottomVendor';

export default function ErrorFallback(){ 
    return(
        <VendorLayout>
            <div>
                <p className="msg">Something went wrong</p>
                <Link className="home--link border-r" style={{ textAlign: 'center' }}to="/">Go To Home</Link>
            </div>
            <NavBottomVendor />
        </VendorLayout>
    )
}
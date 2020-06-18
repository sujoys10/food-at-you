import React from 'react';
import NavbarVendor from './NavbarVendor'
import NavBottomVendor from './NavBottomVendor';

export default function VendorLayout({children}){
    return (
        <div className="vendorLayout">
            <NavbarVendor />
            {children}
            <NavBottomVendor />
        </div>
    )
}
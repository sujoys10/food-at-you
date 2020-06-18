import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import NavBottomVendor from '../../components/vendor/NavBottomVendor';
import VendorLayout from '../../components/vendor/VendorLayout';
import { SpinnerLayoutVendor } from '../../components/Spinner';
import ErrorBoundary from '../../components/ErrorBoundary';


const MenuItemList = lazy(() => import('../../components/vendor/MenuItemList'));

export default function Menu(){
    return(
        <Suspense fallback={<SpinnerLayoutVendor />}>
            <ErrorBoundary>
                <VendorLayout>
                    <div className="menu__header page-header box-shadow">
                        <p className="page-title">Menu</p>
                        <Link
                            className="button-w" 
                            to="/addItem"
                        >Add Item</Link>
                    </div>
                    <MenuItemList />
                    <NavBottomVendor />
                </VendorLayout>
            </ErrorBoundary>
        </Suspense>
    )
}


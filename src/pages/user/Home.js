import React, { Suspense, lazy, useContext } from 'react';
import Layout from '../../components/user/Layout';
import NavBottom from '../../components/user/NavBottom';
import { SpinnerLayout } from '../../components/Spinner';
import { VendorContext } from '../../context/VendorContext';

const VendorSelectionBar = lazy(() => import('../../components/user/VendorSelectionBar'));
const StatusBoard = lazy(() => import('../../components/user/StatusBoard'));
const MealGallery = lazy(() => import ('../../components/user/MealGallery'));

export default function Home(){
    const { vendor } = useContext(VendorContext);
    //const [vendor, setVendor] = useState({});
    
    /* useEffect(() => {
        const vendor = JSON.parse(localStorage.getItem('vendor'));
        setVendor(vendor);
    },[]) */
    return (
        <Suspense fallback={<SpinnerLayout />}>
            <Layout>
                <VendorSelectionBar />
                <StatusBoard />
                <MealGallery vendorID={vendor && vendor.value}/>
                <NavBottom />
            </Layout>
        </Suspense>
    )
}
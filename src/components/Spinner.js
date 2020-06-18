import React from 'react';
import Loader from 'react-loader-spinner';
import Layout from './user/Layout';
import NavBottom from './user/NavBottom';
import VendorLayout from './vendor/VendorLayout';
import NavBottomVendor from './vendor/NavBottomVendor';
import { useQuery } from '@apollo/react-hooks';
import { GET_ROLE } from '../library/query';

export default function Spinner({cStyle, type, dheight, dwidth, height, width}){
    return(
        <div
            style={{height: dheight, width: dwidth}}
            className={cStyle || "spinner"} 
        >
            <Loader
                type={type || "TailSpin"}
                color="#38393b"
                height={height || "40px"}
                width={width || "40px"}
            />
        </div>
    )
}

export function CustomSpinner({type, css, height, width}){
    return(
        <div style={css} >
            <Loader
                type={type || "TailSpin"}
                color="#ff0266"
                height={height || "40px"}
                width={width || "40px"}
            />
        </div>
    )
}



export function SpinnerLayout(){
    return(
        <Layout>
            <Loader
                className="spinner--page" 
                type={"TailSpin"}
                color="#38393b"
                height={"50px"}
                width={"50px"}
                
            />
            <NavBottom />
        </Layout>
    )
}

export function SpinnerLayoutVendor(){
    return(
        <VendorLayout>
            <Loader
                className="spinner--page" 
                type={"TailSpin"}
                color="#38393b"
                height={"50px"}
                width={"50px"}
                
            />
            <NavBottomVendor />
        </VendorLayout>
    )
}

export function LayoutSpinner(){
    const { data: { role } } = useQuery(GET_ROLE);
    return role === 'USER'? <SpinnerLayout /> : <SpinnerLayoutVendor />
}
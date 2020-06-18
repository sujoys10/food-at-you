import React, { useContext } from 'react';
import AsyncSelect from 'react-select/async';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { GET_VENDOR_LIST } from '../../library/query'
import { VendorContext } from '../../context/VendorContext';
import { EMPTY_CART } from '../../library/mutation';

export default function SelectVendor(){
    const client = useApolloClient();
    const { vendor, setVendor, closeModal } = useContext(VendorContext);
    const [ mutation ] = useMutation(EMPTY_CART);

    //get all the vendor names
    const vendorOptions = async (q) => {
        const response = await client.query({
            query: GET_VENDOR_LIST,
            variables: { filter: {
                searchTerm: q
            }}
        })
        const options = [];
        
        response.data.vendors.map(vendor => 
            options.push({
                value: vendor.id,
                label: `${vendor.name}`
            })
        )
        return options;
    }

    const handleChange = (e) => {
        const selectedVendor = e && {label: e.label, value: e.value};
        setVendor(selectedVendor);
        //empty cart
        mutation();
        closeModal(false);
        localStorage.setItem('vendor', JSON.stringify(selectedVendor));
    }


    return(
        <AsyncSelect 
            cacheOptions
            loadOptions={vendorOptions}
            defaultOptions
            isClearable
            placeholder="Select Vendor"
            value={vendor}
            onChange={handleChange}
        />
    )
}


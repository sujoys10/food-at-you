import React, { useState, Fragment } from 'react';
import AsyncSelect from 'react-select/async';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_VENDOR_LIST } from '../../library/query'
import down from '../../images/down-arrow.png';

export default function({vendor, setVendor}){
    const [open, setOpen] = useState(false)
    const client = useApolloClient();

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

    const handleClick = () => {
        setOpen(!open);
    }

    const handleChange = (e) => {
        const selectedVendor = e && {label: e.label, value: e.value};
        setVendor(selectedVendor);
        setOpen(!open);
        localStorage.setItem('vendor', JSON.stringify(selectedVendor));    
    }


    return(
        <div className="vendorSelection">
            {
                open ? (
                    <AsyncSelect 
                        cacheOptions
                        loadOptions={vendorOptions}
                        defaultOptions
                        isClearable
                        placeholder="Select Vendor"
                        value={vendor}
                        onChange={handleChange}
                    />
                ) : (
                    <Fragment>
                        <div className="vendorSelection__box">
                            <div>
                                {vendor? <p>{vendor.label}</p>:
                                    <p onClick={handleClick}>choose your vendor</p>
                                }
                            </div>
                            <img 
                                src={down}
                                alt="down"
                                className="vendorSelection__btn"
                                onClick={handleClick}
                            />
                        </div>
                    </Fragment>
                )
            }
            
        </div>
    )
}


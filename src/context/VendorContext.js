import React, { useState, useEffect } from 'react';

export const VendorContext = React.createContext();

const VendorState = ({ children }) => {
    const [ modal, setModal ] = useState(true);
    const [ vendor, setVendor ] = useState('');

    useEffect(() => {
        const currentVendor = JSON.parse(localStorage.getItem('vendor'));
        setVendor(currentVendor);
        setModal(!currentVendor);
    }, []);

    return(
        <VendorContext.Provider
            value={{
                modal,
                vendor,
                closeModal: setModal,
                setVendor
            }}
        >
            {children}
        </VendorContext.Provider>
    )
}

export default VendorState;
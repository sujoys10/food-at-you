import React, { useContext } from 'react';
import down from '../../images/down-arrow.png';
import VendorModal from './VendorModal';
import { VendorContext } from '../../context/VendorContext';

export default function VendorSelectionBar(){
    const { vendor, closeModal } = useContext(VendorContext);

    const handleClick = () => {
        closeModal(true);
    }

    return(
        <div className="vendorSelection">
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

                    <VendorModal />
                </div>
    
        </div>
    )
}


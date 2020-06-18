import React, { Fragment, useContext } from 'react';
import Modal from '../Modal';
import SelectVendor from './SelectVendor';
import { VendorContext } from '../../context/VendorContext';

export default function VendorModal(){
    //const [open, setOpen] = useState(true);
    const { modal } = useContext(VendorContext);
    return (
        <Fragment>
            { modal ? (
                <Modal>
                    <div className="vendorModal">
                        <div className="vendorModal__content">
                            <p className="vendorModal__header">Choose Vendor</p>
                            <SelectVendor />
                        </div>
                    </div>
                </Modal>
            ) : null }
        </Fragment>
    )
}
import React, { useState, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ORDERBAG_STATUS } from '../../library/mutation';
import Modal from '../Modal';
import Spinner from '../Spinner';


export default function UpdateStatus({ id, bagStatus }){
    const [open, setOpen] = useState(false);
    const [ status, setStatus ] = useState(bagStatus);

    const [mutation, { loading, error }] = useMutation(UPDATE_ORDERBAG_STATUS);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleUpdate = () => {
        mutation({
            variables: {
                id,
                input: { status }
            }
        })
        setOpen(false);
    }
    if(loading) return <Spinner cStyle="spinner-div" height="20px" width="20px" />
    if(error) return <div>error {error.message}</div>
    return(
        <Fragment>
            <button  className="updateStatus__btn" onClick={() => setOpen(!open)}>Update Status</button>
            {
                open ? (
                    <Modal>
                        <div className="modal">
                            <div className="modal__updateStatus">
                                <button className="modal__close" onClick={() => setOpen(false)}>X</button>
                                <p className="modal__heading">Update Status</p>
                                <select className="modal__select" value={status} onChange={handleStatusChange}>
                                    <option value="PLACED">Placed</option>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="DELIVERED">Delivered</option>
                                </select>
                                <button className="modal__save-btn" onClick={handleUpdate}>SAVE</button>
                            </div>
                        </div>  
                    </Modal>
                ) : null
            }
        </Fragment>
    )

}


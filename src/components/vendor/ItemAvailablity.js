import React, { lazy, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { TOGGLE_AVAILABILITY } from '../../library/mutation';

const Spinner = lazy(() => import('../Spinner'));

export default function ItemAvailablity({itemId, inStock}){
    const [ available, setAvailable] = useState(inStock)
    const [mutation, { loading, error}] = useMutation(TOGGLE_AVAILABILITY);

    const handleChange = () => {
        setAvailable(!available);
        mutation({
            variables: {
                id: itemId,
                input: {
                    is_available: !available
                }
            }
        })
    }
    if(loading) return <Spinner cStyle="spinner-div" height={"16px"} width={"16px"} />
    if(error) throw new Error(error.message)
    return(
        <div className="itemAvailablity">
            <label className="container" htmlFor="is_available">In Stock</label>
            <input
                name="is_available" 
                type="checkbox"
                checked={available}
                onChange={handleChange}
            />
        </div>
    )
}
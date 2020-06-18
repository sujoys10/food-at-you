import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { VendorContext } from '../context/VendorContext';

export default function ProfileDetails({name, email}){
    const history = useHistory();
    const client = useApolloClient();
    const { setVendor } = useContext(VendorContext);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('role');
        localStorage.removeItem('cart');
        localStorage.removeItem('vendor');
        setVendor('');
        client.writeData({
            data: {
                isLoggedIn: false,
                currentUser: '',
                role: '',
                cart: ''
            }
        })
        history.push('/');
    
    }
    return(
        <div className="profile__info box-shadow">
            <p>{name}</p>
            <p>Email: {email}</p>
            
            <button className="profile__logout button-border-r" onClick={handleLogOut}>LOG OUT</button>
        </div>
    )
}
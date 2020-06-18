import React, { useEffect, useState } from 'react';
import { useSubscription, useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../../library/query';
import { ORDER_SUBSCRIPTION } from '../../library/subscription';
import notifications from '../../images/notifications.png'

export default function VendorNotification(){
    const [item, setItem] = useState('');
    const [ active, setActive ] = useState(false)
    const [visibility, setVisibility] = useState(false);

    const { data : { currentUser } } = useQuery(GET_USER);

    const { data, loading } = useSubscription(
        ORDER_SUBSCRIPTION,
        { variables: {
            filter: {
                vendor: currentUser
            }
        }}
    )

    useEffect(() => {
        if(data){
            const obj = (Object.values(data)[0]);
            setItem(obj);
            setActive(true);
        }
    }, [data])

    const toggleNotification = () => {
        setVisibility(!visibility);
        setActive(false);
    }

    return(
        <div className="notification">
            <div 
             className="notification__icon"
             onClick={toggleNotification}
            >
                { active? (
                    <span className="material-icons">
                        notifications_active
                    </span>
                ) : (
                    <img src={notifications} alt="notification"/>
                )}  
            </div>
            <div
                className="notification__box box-shadow"
                style={{display: visibility? 'block':'none'}}   
            >
                { !loading && item ? (
                    <div className="notification__item">
                        {console.log('it', item)}
                        <p>{`${item.customer.name} placed a order.`}</p>
                    </div>
                ): ( 
                    <p className="notification__item no-item">No New Notification</p>
                )}
            </div>
            
        </div>
    )
}


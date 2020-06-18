import React, { useEffect, useState } from 'react';
import { useSubscription, useQuery } from '@apollo/react-hooks';
import { ORDERBAG_SUBSCRIPTION } from '../../library/subscription';
import { GET_USER } from '../../library/query';
import notifications from '../../images/notifications.png';

export default function Notification(){
    const [item, setItem] = useState('');
    const [ active, setActive ] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const { data : { currentUser } } = useQuery(GET_USER);

    const { data, loading } = useSubscription(
        ORDERBAG_SUBSCRIPTION,
        { variables: {
            filter: {
                customer: currentUser
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
                        <p>{`Your order for ${item.type.toLowerCase()} has been ${item.status.toLowerCase()}`}</p>
                    </div>
                ): ( 
                    <p className="notification__item">No New Notification</p>
                )}
            </div>
            
        </div>
    )
}
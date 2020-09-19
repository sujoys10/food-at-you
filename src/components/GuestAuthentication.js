import React from 'react';

export default function GuestAuthentication({ login, loading }){
    return (  
      <button
        className="guestBtn"
        disabled={loading}
        onClick={() => login()}
        >
            Log in as guest
        </button>
    )
}
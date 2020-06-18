import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Unauthorized from '../pages/Unauthorized';

const IS_LOGGED_IN = gql`
    query isLoggedIn {
        isLoggedIn @client
        role @client
    }
`

export const ProtectedRoute = ({component: Component, role,...rest}) => {
    const { data: { isLoggedIn, role: group } } = useQuery(IS_LOGGED_IN);
    return (
        <Route {...rest} render={props => (
            isLoggedIn && role === group ?
                <Component {...props}/>
            : !isLoggedIn ? 
                <Redirect to="/" />
              : <Unauthorized />
        )}
        />
    ) 
}


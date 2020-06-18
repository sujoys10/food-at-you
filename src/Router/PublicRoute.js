import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
    query isLoggedIn {
        isLoggedIn @client
        role @client
    }
`

export const PublicRoute = ({component: Component,  ...rest}) => {
    const { data: { isLoggedIn, role } } = useQuery(IS_LOGGED_IN);
    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
               role === 'USER' ?
                  <Redirect to="/home" />
                :   <Redirect to="/dashboard" />
            :<Component {...props} />         
        )}
        />
    ) 
}
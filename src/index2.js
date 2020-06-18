import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/style.scss'
import { ApolloClient, InMemoryCache, HttpLink, gql, split } from 'apollo-boost';
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import { typeDefs, resolvers } from './resolvers';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Auth from './pages/Auth';
import { isTokenValid } from './utils/token';
//const token = localStorage.getItem('token');

const cache = new InMemoryCache({
  dataIdFromObject: Object => Object.id
})

cache.writeData({
    data: {
      isLoggedIn: isTokenValid(),
      currentUser: localStorage.getItem('currentUser'),
      role: localStorage.getItem('role'),
      cartItems: JSON.parse(localStorage.getItem('cart')) || []
    }
  })
//console.log('wstoken', token)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      if(message.includes("Not Authenticated") || message.includes("Invalid Login") || message.includes('jwt expired')){
        //console.log('messagen', message)
        return <Redirect to="/" />
        //App.redirect("/")
      }
      if(message.includes('Not Authorized to update')){
        throw new Error('Not authorized to update');
      }
    });
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    throw new Error('Network interrupted');
  };
});
//wss://food-at-you.herokuapp.com/graphql

const IS_LOGGED_IN = gql`
  query isLoggedIn{
    isLoggedIn @client
  }
`
function IsLoggedIn(){
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <Auth />
}
const httpLink = new HttpLink({
  uri: 'https://food-at-you.herokuapp.com/',
  headers: {
    authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
  }
})

const wsLink = new WebSocketLink({
    uri: `wss://food-at-you.herokuapp.com/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
      }
    }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  cache,
  link: errorLink.concat(link),
  typeDefs,
  resolvers
})
ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <IsLoggedIn />
      </BrowserRouter>
    </ApolloProvider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/style.scss'
import { ApolloClient, InMemoryCache, HttpLink, gql, split } from 'apollo-boost';
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { typeDefs, resolvers } from './resolvers';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Auth from './pages/Auth';
import { isTokenValid } from './utils/token';
import VendorState from './context/VendorContext';



const IS_LOGGED_IN = gql`
  query isLoggedIn{
    isLoggedIn @client
  }
`
function IsLoggedIn(){
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <Auth />
}

const cache = new InMemoryCache({
  dataIdFromObject: Object => Object.id
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if(message.includes("Not Authenticated") || message.includes("Invalid Login") || message.includes('jwt expired')){
        return <Redirect to="/" />
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

const httpLink = new HttpLink({
  uri: 'https://food-at-you.herokuapp.com/',
})

cache.writeData({
  data: {
    isLoggedIn: isTokenValid(),
    currentUser: localStorage.getItem('currentUser'),
    role: localStorage.getItem('role'),
    cartItems: JSON.parse(localStorage.getItem('cart')) || []
  }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
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
        <VendorState>
          <IsLoggedIn />
        </VendorState>
      </BrowserRouter>
    </ApolloProvider>,
  document.getElementById('root')
);


serviceWorker.unregister();

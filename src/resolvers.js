import gql from 'graphql-tag'
import { GET_CART_ITEMS } from './library/query'
import { getToday, getDeliveryDate } from './utils/date'

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean
        currentUser: String
        role: String
        cartItems: [ID!]!
    }
    extend type Item {
        isInCart: Boolean!
        isTimePassed: Boolean!
    }

    extend type Mutation {
        addOrRemoveFromCart(id: ID!): [Item]
        emptyCart: [Item]
    }
`


export const resolvers = {
    Item: {
        isInCart : (item, _, { cache } ) => {
            const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
            return cartItems.includes(item.id);
        },
        isTimePassed : (item) => {
            const now = getToday();
            const delivery_date = getDeliveryDate(0, item.type);

            //check if the delivery time is passed
            if(now > delivery_date){
                return true;
            }
            return false;
        }
    },
    Mutation : {
        addOrRemoveFromCart : (_, { id }, { cache }) => {
            const { cartItems }= cache.readQuery({ query: GET_CART_ITEMS });

            const data = {
                cartItems : cartItems.includes(id)
                 ? cartItems.filter(i => i !== id)
                 : [...cartItems, id] 
            }
            localStorage.setItem('cart', JSON.stringify(data.cartItems))
            cache.writeQuery({ query: GET_CART_ITEMS, data });
            return data.cartItems;
        },

        emptyCart: (_, __, { cache }) => {
            const data = { cartItems: [] };
            localStorage.setItem('cart', JSON.stringify(data.cartItems));
            cache.writeQuery({ query: GET_CART_ITEMS, data });
            return [];
        }
    }
}
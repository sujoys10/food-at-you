import gql from 'graphql-tag';

export const USER_SIGNUP_MUTATION = gql`
    mutation createUser($input: CreateUserInput!){
        createUser(input: $input){
            user{
                name
                email
            }
            token
        }
    }
`

export const SIGNUP_VENDOR = gql`
    mutation createVendor($input: CreateVendorInput!){
        createVendor(input: $input){
            vendor{
                name
                email
            }
            token
        }
    }
`
export const LOGIN_USER = gql`
    mutation loginUser($input: LoginInput!){
        loginUser(input: $input){
            user{
                id
                name
                email
            }
            token
        }
    }
`

export const LOGIN_VENDOR = gql`
    mutation loginVendor($input: LoginInput!){
        loginVendor(input: $input){
            vendor{
                id
                name
                email
            }
            token
        }
    }
`

export const CREATE_ITEM = gql`
    mutation createItem($input: CreateItemInput!){
        createItem(input: $input){
            id
            name
            category
            type
            url
            description
            price
            is_available
            rating
        }
    }
`
export const UPDATE_ITEM = gql`
    mutation updateItem($id: ID!,$input: UpdateItemInput!){
        updateItem(id: $id, input: $input){
            id
            name
            category
            type
            url
            description
            price
            is_available
            rating
        }
    }
`
export const REMOVE_ITEM = gql`
    mutation removeItem($id: ID!){
        removeItem(id: $id){
            id
        }
    }
`

export const TOGGLE_AVAILABILITY = gql`
    mutation updateAvailability($id: ID!,$input: UpdateItemInput!){
        updateItem(id: $id, input: $input){
            id
            is_available
        }
    }
`

/* export const ADD_TO_CARTS = gql`
    mutation addToCart($input: CreateCartItemInput!){
        createCartItem(input: $input){
            id
            item{
                id
                name
                type
                price
                is_available
            }
            type
            quantity
            delivery_date
            added_at
        }
    }
` */


export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($itemId: ID!){
    addOrRemoveFromCart(id: $itemId) @client
  }
`
export const EMPTY_CART = gql`
    mutation emptyCart{
        emptyCart @client
    }
`
export const PLACE_ORDER = gql`
    mutation createOrder($input: CreateOrderInput!){
        createOrder(input: $input){
            id
        }
    }
`
export const UPDATE_ORDERBAG_STATUS = gql`
    mutation updateOrderBag($id: ID!, $input:UpdateOrderBagInput ){
        updateOrderBag(id: $id, input: $input){
            id
            type
            status
            delivery_date
        }
    }
`
import gql from 'graphql-tag';
//import { orderBag } from './fragments';

export const GET_USER = gql`
    query getUser{
        currentUser @client
    }
`
export const GET_ROLE = gql`
    query getRole{
        role @client
    }
`

export const GET_CART_ITEMS = gql`
    query cartItems{
        cartItems @client 
    }
`
export const GET_VENDOR_LIST = gql`
    query vendors($filter: VendorFilterInput){
        vendors(filter: $filter){
            id
            name
        }
    }
`

export const GET_CART_ITEMS_DETAILS = gql`
    query cartItemDetails($filter: ItemFilterInput, $orderBy: ItemOrderByInput) {
        items(filter: $filter, orderBy: $orderBy){
            id
            name
            category
            type
            url
            description
            price
            is_available
            isTimePassed @client
            rating
        }
    }
`

export const GET_VENDOR_ITEMS = gql`
    query vendorItems($filter: ItemFilterInput, $orderBy: ItemOrderByInput) {
        items(filter: $filter, orderBy: $orderBy){
            id
            name
            category
            type
            url
            description
            price
            is_available
        }
    }
`
export const GET_ITEM = gql`
    query getItem($filter: ItemFilterInput) {
        items(filter: $filter){
            id
            name
            category
            type
            url
            description
            price
            isInCart @client
            is_available
            rating
        }
    }
`

export const GET_DETAILS_FOR_ORDER = gql`
    query getItem($filter: ItemFilterInput) {
            items(filter: $filter){
                id
                type
                price
                isTimePassed @client
                is_available
                vendor{
                    email
                }
            }
        }
`

export const GET_PROFILE_DETAILS = gql`
    query profile($filter: UserFilterInput, $orderBy: OrderOrderByInput,$bagOrderBy: OrderBagOrderByInput){
        users(filter: $filter){
            id
            name
            email
            address
            phone
            orders(orderBy: $orderBy){
               id
               total
               vendor{
                  name
              }
              order_date
              delivery_address
              order_bags(orderBy: $bagOrderBy){
                id
                type
                status
                delivery_date
                items{
                  item{
                    name
                    price
                  }
                  quantity
                }
              }
            }
        }
    }
`

export const GET_LATEST_BAG = gql`
     query deliveryBag($filter: OrderBagFilterInput, $orderBy: OrderBagOrderByInput, $first: Int){
        deliveryBag(filter: $filter, orderBy: $orderBy, first: $first){
            id
            type
            status
            delivery_date
            items{
                id
                item{
                    name
                    price
                }
                quantity
                delivery_date
                status
            }
        }
    }  
`

export const GET_ORDER_BAGS = gql`
     query orderBags($filter: OrderBagFilterInput, $orderBy: OrderBagOrderByInput){
        orderBags(filter: $filter, orderBy: $orderBy){
            id
            type
            status
            delivery_date
            items{
                id
                item{
                    name
                    price
                }
                quantity
                delivery_date
                status
            }
        }
    }  
`

export const GET_VENDOR_DETAILS = gql`
    query profile($filter: VendorFilterInput, $orderBy: OrderOrderByInput,$bagOrderBy: OrderBagOrderByInput){
        vendors(filter: $filter){
            id
            name
            email
            address
            phone
            rating
            orders(orderBy: $orderBy){
                id
                customer{
                    name
                }
                order_date
                total
                delivery_address
                order_bags(orderBy: $bagOrderBy){
                    id
                    type
                    status
                    delivery_date
                    items{
                        item{
                        name
                        price
                        }
                        quantity
                    }
                }
            }
        }
    }
`



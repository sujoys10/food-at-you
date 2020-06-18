import gql from "graphql-tag";

export const ITEM_SUBSCRIPTION = gql`
    subscription itemSubscription($filter: ItemSubscriptionFilterInput){
        subscribeToItem(filter: $filter){
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


export const ORDERBAG_SUBSCRIPTION = gql`
    subscription orderBagSubscription($filter: OrderBagSubscriptionFilterInput){
        subscribeToOrderBag(filter: $filter){
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

export const ORDER_SUBSCRIPTION = gql`
    subscription subscribeToOrder($filter: OrderSubscriptionFilterInput){
        subscribeToOrder(filter: $filter){
            id
            customer{
                name
            }
            delivery_address
            order_bags{
                id
                type
            }
        }
    }
`
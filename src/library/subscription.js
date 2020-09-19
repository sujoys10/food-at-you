import gql from "graphql-tag";
import { ITEM_DETAILS, ORDER_BAG_DETAILS } from "./fragments";

export const ITEM_SUBSCRIPTION = gql`
    subscription itemSubscription($filter: ItemSubscriptionFilterInput){
        subscribeToItem(filter: $filter){
            ...itemDetails
            isInCart @client
        }
    }
    ${ITEM_DETAILS}
`


export const ORDERBAG_SUBSCRIPTION = gql`
    subscription orderBagSubscription($filter: OrderBagSubscriptionFilterInput){
        subscribeToOrderBag(filter: $filter){
            ...orderBagsList
        }
    }
    ${ORDER_BAG_DETAILS}
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
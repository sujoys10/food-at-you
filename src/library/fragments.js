import gql from 'graphql-tag';

export const orderPage = {
    order: gql`
        fragment orderDetails on Order{
            id
            total
            vendor{
                name
            }
            order_date
            delivery_address
        }
    `,
    orderBag: gql`
        fragment bagDetails on OrderBag{
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
                delivery_date
                status
            }
        }    
    `
}

export const ITEM_DETAILS = gql`
    fragment itemDetails on Item {
        id
        name
        category
        type
        url
        description
        price
        is_available
    }
`

export const ORDER_BAG_DETAILS = gql`
    fragment orderBagsList on OrderBag{
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
        }
    }    
`
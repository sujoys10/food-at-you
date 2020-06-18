import gql from 'graphql-tag';

export const fragments = {
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
            }
        }    
    `
}

export const orderBag = gql`
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
        }
    }    
`
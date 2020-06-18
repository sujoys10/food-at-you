export const calculateTotal = (cartItems) => {
    //filter items which are eligble for order
    const orderItems = cartItems
            .filter(item => !item.isTimePassed && item.is_available);

    const reducer = (sum, current) => {
        return sum + current.price;
    }
    const sum = orderItems.reduce(reducer, 0);
    return sum;
}
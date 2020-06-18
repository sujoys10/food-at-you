export const filterOrdersByType = (bags, type) => {
    //console.log({bags, type})
    const filteredBags = bags.filter(bag => bag.type === type);
    //console.log({filteredBags});
    return filteredBags;
}

export const filterOrderBags = (bags, type, status) => {
   // console.log({bags,type, status})
    
    const filteredBags = bags.filter(bag => {
        const typeMatch = type ? bag.type === type : true;
        const statusMatch = status ? bag.status === status : true;
        return typeMatch && statusMatch
    })
    //console.log({filteredBags});
    return filteredBags;
}
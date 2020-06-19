export const filterItems = (items) => {
    let breakfast = [], snacks = [], lunch = [], dinner = [];
    items.map(item => {
        switch(item.type){
            case 'BREAKFAST':
                return breakfast.push(item);
            case 'SNACKS':
                snacks.push(item);
                break;
            case 'LUNCH': 
                lunch.push(item);
                break;
            case 'DINNER':
                dinner.push(item);
                break;
            default:
                break;                
        }
    })
    return {
        breakfast,
        snacks,
        lunch,
        dinner
    }
}
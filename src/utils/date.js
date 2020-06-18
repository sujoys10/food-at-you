const hours = {
    BREAKFAST: 9,
    LUNCH: 13,
    SNACKS: 17,
    DINNER: 22
}

// get delivery date in ISO format
export const getDeliveryDate = (day, type) => {
    const d = new Date();
    d.setDate(d.getDate() + day)
    d.setHours(hours[type]);
    d.setMinutes(0);
    d.setSeconds(0);
    const nextDay = d.toISOString();
    return nextDay;
}

// get delivery time in 'HH AM' format
export const getDeliveryTime = (type) => {
    const time = type === 'BREAKFAST' ? hours[type] + ' AM' : (hours[type] - 12) + ' PM';
    return time;
}

//get local time 
export const getLocalDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
}

//get current day
export const getToday = () => {
    const d = new Date();
    return d.toISOString();
}

//get type based on current time
export const getDefaultType = () => {
    const d = new Date();
    const hour = d.getHours();

    if(hour <= 8) return 'BREAKFAST';
    else if(hour <= 12) return 'LUNCH';
    else if(hour <= 16) return 'SNACKS';
    else return 'DINNER'
}


export const getNextDay = () => {
    const day = new Date();
    day.setDate(day.getDate() + 1);
    const nextDay = day.toISOString();
    return nextDay;
}
export const getWeekNumber = (date: Date) => {
    const oneJan = new Date(date.getFullYear(),0,1);
    return Math.ceil((((date.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay()+1)/7);
}

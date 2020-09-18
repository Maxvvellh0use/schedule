export const getCorrectTime = (date: string): string => {
    const dateObj = new Date(date);
    const zone = localStorage.getItem('timezone'); //ERROR, add check EMPTY LOCAL STORAGE
    return dateObj.toLocaleTimeString('en-GB', {timeZone: `${zone}`} ).slice(0, -3);
}

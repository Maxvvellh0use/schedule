export const getCorrectTime = (date: string): string => {
    const dateObj = new Date(date);
    const zone = localStorage.getItem('timezone');
    return dateObj.toLocaleTimeString('en-GB', {timeZone: `${zone}`} ).slice(0, -3);
}

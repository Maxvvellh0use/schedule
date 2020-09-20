export const getCorrectTime = (date: string, defaultZone: string): string => {
    const dateObj = new Date(date);
    const zone = localStorage.getItem('timezone')|| defaultZone;
    return dateObj.toLocaleTimeString('en-GB', {timeZone: `${zone}`} ).slice(0, -3);
}

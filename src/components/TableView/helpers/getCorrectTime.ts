export const getCorrectTime = (date: string, defaultZone: string, activeZone: any): string => {
    const dateObj = new Date(date);
    const zone = activeZone || defaultZone;
    return dateObj.toLocaleTimeString('en-GB', {timeZone: `${zone}`} ).slice(0, -3);
}

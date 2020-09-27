export const getCorrectDate = (date: string, defaultZone: string, activeZone:string): string => {
    const dateObj = new Date(date);
    const zone = activeZone || defaultZone;
    return dateObj.toLocaleDateString('en-GB', {timeZone: `${zone}`} )
}

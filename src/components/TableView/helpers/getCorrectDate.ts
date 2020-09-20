export const getCorrectDate = (date: string, defaultZone: string): string => {
    const dateObj = new Date(date);
    const zone = localStorage.getItem('timezone')|| defaultZone;
    return dateObj.toLocaleDateString('en-GB', {timeZone: `${zone}`} )
}

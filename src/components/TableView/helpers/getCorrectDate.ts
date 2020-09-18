export const getCorrectDate = (date: string): string => {
    const dateObj = new Date(date);
    const zone = localStorage.getItem('timezone');
    return dateObj.toLocaleDateString('en-GB', {timeZone: `${zone}`} )
}

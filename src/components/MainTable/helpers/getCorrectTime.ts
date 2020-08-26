export const getCorrectTime = (date: string): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString().slice(0, -3);
}

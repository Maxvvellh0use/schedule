export const getCorrectTime = (date: string): string => {
    const dateArray = date.split(' ');
    const fullTime = dateArray[dateArray.length - 1];
    return fullTime.slice(0, 5);
}

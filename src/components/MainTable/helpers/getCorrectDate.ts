export const getCorrectDate = (date: string): string => {
    const resArray: string[] = date.split(' ');
    resArray.pop();
    return resArray.join(' ');
}

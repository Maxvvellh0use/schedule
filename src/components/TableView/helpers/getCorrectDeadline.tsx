export const getCorrectDeadline = (deadlineDate: string): string => {
    const zone = localStorage.getItem('timezone');
    return deadlineDate ? new Date(deadlineDate).toLocaleString('en-GB', {timeZone: `${zone}`} ).slice(0, -3) : '';
}

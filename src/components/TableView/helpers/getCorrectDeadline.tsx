export const getCorrectDeadline = (deadlineDate: string, defaultZone: string): string => {
    const zone = localStorage.getItem('timezone')|| defaultZone;
    return deadlineDate ? new Date(deadlineDate).toLocaleString('en-GB', {timeZone: `${zone}`} ).slice(0, -3) : '';
}

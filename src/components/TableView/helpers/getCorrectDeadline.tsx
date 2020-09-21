export const getCorrectDeadline = (deadlineDate: string, defaultZone: string, activeZone:string): string => {
    const zone = activeZone || defaultZone;
    return deadlineDate ? new Date(deadlineDate).toLocaleString('en-GB', {timeZone: `${zone}`} ).slice(0, -3) : '';
}

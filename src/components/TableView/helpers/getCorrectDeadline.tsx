export const getCorrectDeadline = (deadlineDate: string): string => {
    return deadlineDate ? new Date(deadlineDate).toLocaleString().slice(0, -3) : '';
}

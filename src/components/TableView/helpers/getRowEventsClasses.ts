const isTodayEvent = (dateNow: Date, dateEvent: Date) => {
    return dateNow.getDate() === dateEvent.getDate() &&
        dateNow.getMonth() === dateEvent.getMonth()
}

export const getRowEventsClasses = (record: any) => {
    const dateNow = new Date(Date.now());
    const dateEvent = new Date(record.dateString);
    if (dateNow.getTime() > dateEvent.getTime() && !isTodayEvent(dateNow, dateEvent)) {
        return 'table-row-passed';
    } else if (isTodayEvent(dateNow, dateEvent)) {
        return 'table-row-today';
    } return ''
}

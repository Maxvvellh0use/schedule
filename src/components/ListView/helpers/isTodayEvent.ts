export const isTodayEvent = (dateEventString: string) => {
    const dateEvent = new Date(dateEventString);
    const dateNow = new Date(Date.now());
    return dateNow.getDate() === dateEvent.getDate() &&
        dateNow.getMonth() === dateEvent.getMonth()
}

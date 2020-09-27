interface Event {
    optional: {
        date: string,
    }
}

export const sortEventsByDate = (event1: Event, event2: Event) => {
    return new Date(event1.optional.date).getTime() -
        new Date(event2.optional.date).getTime()
}

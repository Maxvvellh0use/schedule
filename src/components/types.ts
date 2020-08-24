export interface Event {
    id: number,
        name: string,
        type: string,
        optional: {
            date: string,
            description:  string,
            organizer:  string,
            place:  string,
            materials:  string,
            deadline: string
    },
    course: string,
}


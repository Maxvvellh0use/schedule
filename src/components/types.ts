export interface EventData {
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

export interface MutableEventData {
    id: number,
        name: string,
        type: string,
        optional: {
            date: Date,
            description:  string,
            organizer:  string,
            place:  string,
            materials:  string,
            deadline: string
    },
    course: string,
}

export interface Name {
    text: string,
    link: string,
}


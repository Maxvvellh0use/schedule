export interface EventData {
    id: number,
        name: string,
        type: string,
        optional: {
            date: string,
            description: string,
            organizer: string,
            place: string,
            materials: string[] | string,
            deadline: string,
            details: string,
            duration: string,
            result: string,
            notate: string
    },
    course: string,
}

export interface MutableEventData {
    name: string,
    type: string,
    date: Date,
    description: string,
    id: number,
}

export interface NameEventType {
    text: string,
    link: string,
    type: string,
    id: number,
}

export interface ListTypes {
    type: "success" | "processing" | "error" | "default" | "warning" | undefined,
    content: string,
    link: string,
}

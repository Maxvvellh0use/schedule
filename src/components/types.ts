export interface EventData {
    _id: number,
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
            notate: string,
            feedback: boolean
    },
    course: string,
}

export interface MutableEventData {
    name: string,
    type: string,
    date: Date,
    description: string,
    _id: number,
}

export interface NameEventType {
    text: string,
    link: string,
    type: string,
    _id: number,
}

export interface ListTypes {
    type: "success" | "processing" | "error" | "default" | "warning" | undefined,
    content: string,
    link: string,
    _id: number,
}

export interface TableData {
    key: number,
    date: string,
    time: string,
    type: string,
    place: string,
    name: {
        text: string,
        link: string,
        _id: number
    },
    action: {
        _id: number,
        key: number,
    },
    duration: string,
    result: string,
    notate: string,
    materials: string,
    deadline: string,
    description: string,
    tags: string[],
}


export interface RootStateType {
    allEventsData: EventData[];
    app: {
        loading: boolean,
        errorText: string,
        mode: string,
        accessability: boolean,
        language: string,
        date: string,
    },
    tableColorStyle: {[key: string]: object}
}

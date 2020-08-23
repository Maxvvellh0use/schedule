export interface Event {
    id: Number,
        name: String,
        type: String,
        optional: {
            date: Date,
            description:  String,
            organizer:  String,
            place:  String,
            materials:  String,
            deadline: String
    },
    course: String,
}


export const defaultPageNumber = 1;

export const columnNames = [
    'Course',
    'Date',
    'Time',
    'Type',
    'Place',
    'Name',
    'Duration',
    'Result',
    'Notate',
    'Materials',
    'Deadline',
]

export const defaultColumnsVisible: { [key: string]: boolean } = {
    Course: true,
    Date: true,
    Time: true,
    Type: true,
    Place: true,
    Name: true,
    Duration: false,
    Result: false,
    Notate: false,
    Materials: true,
    Deadline: true,
}

export const defaultColumnsWidths: { [key: string]: number } = {
    Course: 70,
    Date: 90,
    Time: 60,
    Type: 110,
    Place: 70,
    Name: 100,
    Duration: 30,
    Result: 75,
    Notate: 60,
    Materials: 100,
    Deadline: 85,
    Action: 60,
}

export const filtersType = [
    {
        text: 'Task',
        value: 'Task',
    },
    {
        text: 'YouTube Live',
        value: 'YouTube Live',
    },
    {
        text: 'Meetup',
        value: 'Meetup',
    },
    {
        text: 'Test',
        value: 'Test',
    },
    {
        text: 'Self Education',
        value: 'Self Education',
    },
    {
        text: 'Deadline',
        value: 'Deadline',
    },
    {
        text: 'Interview',
        value: 'Interview',
    },
    {
        text: 'Registration',
        value: 'Registration',
    },
]

export const filtersCourse = [
    {
        text: 'JS Stage 1 2020 Q2',
        value: 'JS Stage 1 2020 Q2',
    },
    {
        text: 'JS Stage 2 2020 Q2',
        value: 'JS Stage 2 2020 Q2',
    },
    {
        text: 'React 2020 Q3',
        value: 'React 2020 Q3',
    },
    {
        text: 'EPAM course',
        value: 'EPAM course',
    },
]

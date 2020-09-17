export const deadlineColor = 'volcano';
export const taskColor = 'green';

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
    'Tags',
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
    Tags: true,
}

export const defaultColumnsWidths: { [key: string]: number } = {
    Course: 50,
    Date: 65,
    Time: 50,
    Type: 70,
    Place: 70,
    Name: 100,
    Duration: 30,
    Result: 50,
    Notate: 30,
    Materials: 100,
    Deadline: 110,
    Tags: 70,
    Action: 100,
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

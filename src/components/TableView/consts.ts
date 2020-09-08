export const deadlineColor = 'volcano';
export const taskColor = 'green';

export const columnNames = [
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
    'Action',
]

export const defaultColumnsVisible: { [key: string]: boolean } = {
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
    Action: true,
}

export const defaultColumnsWidths: { [key: string]: number } = {
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

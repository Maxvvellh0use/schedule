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
    Duration: true,
    Result: true,
    Notate: true,
    Deadline: true,
    Tags: true,
    Action: true,
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

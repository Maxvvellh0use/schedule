const colors: { [key: string]: string } = {
    'Deadline': 'red',
    'Task': 'blue',
    'YouTube Live': 'green',
    'Meetup': 'lime',
    'Test': 'volcano',
    'Self Education': 'cyan',
    'Interview': 'gold',
    'Registration': 'purple',
    'Crosscheck': 'geekblue',
}

export const getTypeColor = (text: string) => {
   return colors[text];
}

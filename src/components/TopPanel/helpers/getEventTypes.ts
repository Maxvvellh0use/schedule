export const getEventTypes = (eventsData: {type: string}[]):string[] => {

  const events = eventsData.map(item => item.type);
  const uniqueEvents = events.filter((item, index) => events.indexOf(item) === index)

  return uniqueEvents
}
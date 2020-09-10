export const getTableColorData = (eventTypes: string[]) => {
  const colorData: {[key: string]: object} = {};
  eventTypes.forEach((item) => colorData[item] = localStorage[item] ? JSON.parse(localStorage[item]) : {},)
  return colorData;
}

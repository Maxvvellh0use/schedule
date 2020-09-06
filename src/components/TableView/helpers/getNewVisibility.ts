export const getNewVisibility = (columnsTable: any, columnsVisible:
    { [key: string]: boolean }, columnName: string) => {
    const newColumnsVisible = Object.assign({}, columnsVisible);
    newColumnsVisible[columnName] = !newColumnsVisible[columnName];
    const newColumnsTable = columnsTable.slice()
    const hideColumnIndex = newColumnsTable.findIndex((column: { title: string; }) =>
        column.title === columnName);
    newColumnsTable[hideColumnIndex].visibility = !newColumnsTable[hideColumnIndex].visibility;
    return { newColumnsTable, newColumnsVisible }
}

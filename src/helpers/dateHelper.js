export function getFormattedDate(dataSource){
    const dataObject = new Date(dataSource)
    return dataObject.getFullYear() + '-' + ('0' + (dataObject.getMonth() + 1)).slice(-2) + '-' + ('0' + dataObject.getDate()).slice(-2)
}
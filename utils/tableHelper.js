const getTableData = (sheetData) => {
  const tableData = {}
  Object.entries(sheetData).forEach(([sheetTitle, {headers, rows}]) => {
    const {columns, data} = getColumnsAndData(headers, rows)
    tableData[sheetTitle] = {columns, data}
  })
  return tableData
}

const getColumnsAndData = (headers, rows) => {
  const columns = headers.map(header => getColumn(header))
  const data = getData(columns, rows)
  return {columns, data}
}

const getData = (columns, rows) => {
  const data = []
  rows.forEach(row => {
    let rowObj = {}
    row.forEach((val, i) => (rowObj[columns[i].accessor] = val))
    data.push(rowObj)
  })
  return data
}

const getColumn = header => {
  let [columnName, option, hidden] = [header, '', false]
  const accessor = getAccessor(header)
  if (header.includes(' - ')) [columnName, option] = header.split(' - ')
  if (option.toLowerCase().includes('hidden')) hidden = true
  return {columnName, accessor, hidden, header}
}

const getAccessor = columnName => {
  let accessor = columnName.replace(/ /g, '').toLowerCase()
  accessor = accessor.replace('-', '_')
  return accessor
}

module.exports = {getTableData}

const getTableData = sheetData => {
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
  const column = {
    Header: header,
    accessor: getAccessor(header),
    show: true,
    option: ''
  }
  if (header.includes(' - ')) [column.Header, column.option] = header.split(' - ')
  // hidden
  if (column.option.toLowerCase().includes('hidden')) column.show = false
  // hyperlink link
  if (column.Header.toLowerCase().includes('hyperlink')) column.show = false
  // hyperlink reference
  if (column.option.toLowerCase().includes('hyperlink'))
    column.linkAccessor = getAccessor(column.option)

  return column
}

const getAccessor = columnName => {
  let accessor = columnName.replace(/ /g, '').toLowerCase()
  accessor = accessor.replace('-', '_')
  return accessor
}

module.exports = {getTableData}

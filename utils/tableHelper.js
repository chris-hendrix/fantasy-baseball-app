const getTableData = (sheetData) => {
  const tableData = {}
  Object.entries(sheetData).forEach(([sheetTitle, { headers, rows, alignments }]) => {
    const { columns, data } = getColumnsAndData(headers, rows, alignments)
    tableData[sheetTitle] = { columns, data }
  })
  return tableData
}

const getColumnsAndData = (headers, rows, alignments) => {
  const columns = headers.map((header) => getColumn(header, alignments[header]))
  const data = getData(columns, rows)
  return { columns, data }
}

const getData = (columns, rows) => {
  const data = []
  rows.forEach((row) => {
    const rowObj = {}
    row.forEach((val, i) => (rowObj[columns[i].accessor] = val))
    data.push(rowObj)
  })
  return data
}

const getColumn = (header, alignment) => {
  const column = {
    Header: header,
    accessor: getAccessor(header),
    show: true,
    disableFilters: true,
    option: '',
    alignment: alignment ? alignment.toLowerCase() : undefined
  }
  if (header.includes(' - ')) [column.Header, column.option] = header.split(' - ')
  // hidden
  if (column.option.toLowerCase().includes('hidden')) column.show = false
  // hyperlink link
  if (column.Header.toLowerCase().includes('hyperlink')) column.show = false
  // hyperlink reference
  if (column.option.toLowerCase().includes('hyperlink')) { column.linkAccessor = getAccessor(column.option) }

  return column
}

const getAccessor = (columnName) => {
  let accessor = columnName.replace(/ /g, '').toLowerCase()
  accessor = accessor.replace('-', '_')
  return accessor
}

module.exports = { getTableData }

import axios from 'axios'
const baseUrl = '/api/sheets'

const getData = async (dataType) => {
  const LOCAL_KEY = dataType.toUpperCase() + '_DATA'
  try {
    const response = await axios.get(`${baseUrl}/${dataType}`)
    const tables = response.data
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(tables))
    return { tables, cached: false }
  } catch (error) {
    const tablesString = window.localStorage.getItem(LOCAL_KEY)
    if (tablesString) {
      const tables = JSON.parse(tablesString)
      return { tables, cached: true }
    } else {
      return { error }
    }
  }
}

const dataService = { getData }
export default dataService

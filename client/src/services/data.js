import axios from 'axios'
const baseUrl = '/api/sheets'

const getDraftData = async () => {
  const response = await axios.get(`${baseUrl}/draft`)
  return response.data
}

const getStaticData = async () => {
  const response = await axios.get(`${baseUrl}/static`)
  return response.data
}

const dataService = {getDraftData, getStaticData}
export default dataService

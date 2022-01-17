import axios from 'axios'
const baseUrl = '/api/sheets'

const STATIC_DATA_KEY = 'staticData'
const CACHE_DATE_KEY = 'cacheDate'
const MAX_CACHE_DAYS = 30

const getDraftData = async () => {
  const response = await axios.get(`${baseUrl}/draft`)
  return response.data
}

const getStaticData = async () => {
  // try to get data from cache
  const localDataString = window.localStorage.getItem(STATIC_DATA_KEY)
  const cacheDateString = window.localStorage.getItem(CACHE_DATE_KEY)
  const today = new Date()
  /*
  // try to get data from cache
  if (localDataString && cacheDateString) {
    const localData = JSON.parse(localDataString)
    const cacheDate = new Date(cacheDateString)
    const ageInTime = today.getTime() - cacheDate.getTime()
    const ageInDays = ageInTime / (1000 * 3600 * 24)
    if (ageInDays < MAX_CACHE_DAYS) return localData
  }
  */
  // get data and set cache
  const response = await axios.get(`${baseUrl}/static`)
  const data = response.data
  window.localStorage.setItem(STATIC_DATA_KEY, JSON.stringify(data))
  window.localStorage.setItem(CACHE_DATE_KEY, today.toString())
  return data
}

const clearCache = () => {
  window.localStorage.removeItem(STATIC_DATA_KEY)
  window.localStorage.removeItem(CACHE_DATE_KEY)
}

const dataService = {getDraftData, getStaticData, clearCache}
export default dataService

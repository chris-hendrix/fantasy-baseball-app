import dataService from '../services/data'

const GET_STATIC_TABLES = 'GET_STATIC_TABLES'
const GET_STATIC_TABLES_CACHED = 'GET_STATIC_TABLES_CACHED'
const STATIC_DATA_ERROR = 'STATIC_DATA_ERROR'

const initialState = {
  loading: true,
  tables: {}
}

const staticDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATIC_TABLES:
    case GET_STATIC_TABLES_CACHED: 
      return { ...state, tables: action.tables, loading: false }
    case STATIC_DATA_ERROR:
      return { ...state, error: action.error }
    default: 
      return state
  }
}

export const getStaticTables = () => async (dispatch) => {
  const data = await dataService.getData('static')
  const { tables, cached, error } = data

  if (error) dispatch({ type: STATIC_DATA_ERROR, error })
  dispatch({
    type: cached ? GET_STATIC_TABLES_CACHED : GET_STATIC_TABLES,
    tables
  })
}

export default staticDataReducer
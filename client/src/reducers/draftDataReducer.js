import dataService from '../services/data'

const GET_DRAFT_TABLES = 'GET_DRAFT_TABLES'
const GET_DRAFT_TABLES_CACHED = 'GET_DRAFT_TABLES_CACHED'
const DRAFT_DATA_ERROR = 'DRAFT_DATA_ERROR'

const initialState = {
  loading: true,
  tables: {}
}

const draftDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRAFT_TABLES:
    case GET_DRAFT_TABLES_CACHED: 
      return { ...state, tables: action.tables, loading: false }
    case DRAFT_DATA_ERROR:
      return { ...state, error: action.error }
    default: 
      return state
  }
}

export const getDraftTables = () => async (dispatch) => {
  const data = await dataService.getData('draft')
  const { tables, cached, error } = data

  if (error) dispatch({ type: DRAFT_DATA_ERROR, error })
  dispatch({
    type: cached ? GET_DRAFT_TABLES_CACHED : GET_DRAFT_TABLES,
    tables
  })
}

export default draftDataReducer
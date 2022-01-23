import dataService from '../services/data'

const GET_STATIC_TABLES = 'GET_STATIC_TABLES'

const initialState = {
  loading: true,
  tables: {}
}

const staticDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATIC_TABLES: {
      return { ...state, tables: action.tables, loading: false }
    }
    default: {
      return state
    }
  }
}

export const getStaticTables = () => async (dispatch) => {
  const staticTables = await dataService.getStaticTables()
  dispatch({ type: GET_STATIC_TABLES, tables: staticTables })
}

export default staticDataReducer
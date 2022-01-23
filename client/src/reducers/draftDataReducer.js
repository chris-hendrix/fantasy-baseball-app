import dataService from '../services/data'

const GET_DRAFT_TABLES = 'GET_DRAFT_TABLES'

const initialState = {
  loading: true,
  tables: {}
}

const draftDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRAFT_TABLES: {
      return { ...state, tables: action.tables, loading: false }
    }
    default: {
      return state
    }
  }
}

export const getDraftTables = () => async (dispatch) => {
  const staticTables = await dataService.getDraftTables()
  dispatch({ type: GET_DRAFT_TABLES, tables: staticTables })
}

export default draftDataReducer
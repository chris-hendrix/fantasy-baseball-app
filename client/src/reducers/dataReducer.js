import dataService from '../services/data'

const GET_DRAFT_DATA = 'GET_DRAFT_DATA'
const GET_STATIC_DATA = 'GET_STATIC_DATA'
const CLEAR_CACHE = 'CLEAR_CACHE'

const initialState = {
  draft: {},
  static: {}
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRAFT_DATA: {
      return { ...state, draft: action.data }
    }
    case GET_STATIC_DATA: {
      return { ...state, static: action.data }
    }
    case CLEAR_CACHE: {
      return state
    }
    default: {
      return state
    }
  }
}

export const getDraftData = () => async (dispatch) => {
  const draftData = await dataService.getDraftData()
  dispatch({ type: GET_DRAFT_DATA, data: draftData })
}

export const getStaticData = () => async (dispatch) => {
  const staticData = await dataService.getStaticData()
  dispatch({ type: GET_STATIC_DATA, data: staticData })
}

export const clearCache = () => dispatch => {
  dataService.clearCache()
  dispatch({ type: CLEAR_CACHE })
}


export default dataReducer
import ruleService from "../services/rules"

const GET_RULES = 'GET_RULES'

const initialState = { rules: '' }

const rulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RULES: {
      console.log(action)
      return { rules: action.rules }
    }
    default: {
      return state
    }
  }
}

export const getRules = () => async (dispatch) => {
  const rules = await ruleService.getRules()
  dispatch({ type: GET_RULES, rules })
}

export default rulesReducer
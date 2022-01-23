import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import draftDataReducer from './reducers/draftDataReducer'
import staticDataReducer from './reducers/staticDataReducer'
import rulesReducer from './reducers/rulesReducer'

const reducer = combineReducers({
  draft: draftDataReducer,
  static: staticDataReducer,
  rules: rulesReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store

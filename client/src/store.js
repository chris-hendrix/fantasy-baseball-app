import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import dataReducer from './reducers/dataReducer'
import rulesReducer from './reducers/rulesReducer'

const reducer = combineReducers({
  data: dataReducer,
  rules: rulesReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store

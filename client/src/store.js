import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import dataReducer from './reducers/dataReducer'

const reducer = combineReducers({
  data: dataReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
console.log(store)
export default store

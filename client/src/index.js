import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {console.log(process.env.REACT_APP_EMAILJS_SERVICE_ID)}
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

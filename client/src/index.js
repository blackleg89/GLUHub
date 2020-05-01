import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import firebase from './firebase'
import {
  BrowserRouter as Router,
  Switch, 
  Route,
  withRouter
} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import {createStore} from 'redux'
import {Provider,connect} from 'react-redux'
import rootReducer from './reducers'
import {setUser, clearUser} from './actions'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import firebase from './firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import rootReducer from './reducers'

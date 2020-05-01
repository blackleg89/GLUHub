import {combineReducers} from 'redux'
import * as actionTypes from '../actions/types'

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const user_reducer = {state = initialUserState, action} =>{
    switch(action.type)
}
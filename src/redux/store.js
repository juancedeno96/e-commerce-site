import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from './userReducer'
import promiseMiddleware from 'redux-promise-middleware'


const rootReducer = combineReducers({
    userReducer,
    
})


export default createStore(rootReducer, applyMiddleware(promiseMiddleware))

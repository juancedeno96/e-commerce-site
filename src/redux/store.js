import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import promiseMiddleware from 'redux-promise-middleware'


const rootReducer = combineReducers({
    userReducer,
    productReducer,
    cartReducer
    
    
})


export default createStore(rootReducer, applyMiddleware(promiseMiddleware))

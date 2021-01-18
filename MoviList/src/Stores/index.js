import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import MovieReducers from './Reducers/MovieReducers.js'

const reducers = combineReducers({
    MovieReducers
})

const store = (createStore(reducers, applyMiddleware(thunk)))

export default store
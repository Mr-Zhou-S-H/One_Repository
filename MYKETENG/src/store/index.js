import {createStore,applyMiddleware} from 'redux'
import reducer from './reducer/index'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

// 创建store 并且应用中间件
let store = createStore(reducer,applyMiddleware(reduxLogger,reduxThunk,reduxPromise))

export default store
import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../redux/reducers/auth.js'
import api from './api/api.js';
import miscSlice from './reducers/misc.js';
import chatSlice from './reducers/chat.js';

const store = configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer,
        [api.reducerPath]:api.reducer,
        [miscSlice.name]:miscSlice.reducer,
        [chatSlice.name]:chatSlice.reducer
    },
    middleware:(defaultMiddleware)=>[...defaultMiddleware(),api.middleware]
})

export default store;
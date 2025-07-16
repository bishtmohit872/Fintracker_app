// appStore.js
import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'

import userReducer from './userSlice';
import summaryReducer from './summarySlice'
import recentTransactionReducer from './recentTransactionSlice'
import spendingCategoryReducer from './spendingCategorySlice'
import { root } from "postcss";

const rootReducer = combineReducers({
    user: userReducer,
    summary:summaryReducer,
    recentTransaction:recentTransactionReducer,
    spendingCategory:spendingCategoryReducer,
})

const persistConfig = {
  key:'root',
  storage,
  whitelist:['user']
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const appStore = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  })
})


export const persistor = persistStore(appStore)
export default appStore;
 
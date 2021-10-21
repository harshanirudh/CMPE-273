import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import rootReducer from "./rootReducer";

const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, rootReducer)
// const store = createStore(rootReducer, composeWithDevTools());


    export const store = createStore(persistedReducer,composeWithDevTools())
    export const persiststore = persistStore(store)
    

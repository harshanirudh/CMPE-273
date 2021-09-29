import { combineReducers } from "redux";

import cartReducer from './Cart/Cart-reducer'

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
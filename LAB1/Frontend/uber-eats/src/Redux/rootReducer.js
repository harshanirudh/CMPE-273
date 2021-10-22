import { combineReducers } from "redux";

import cartReducer from './Cart/Cart-reducer'
import LoginReducer from './Login/Login-reducers'
import SignUpReducer from "./Signup/Signup-reducer";
import CustomerReducer from "./Customer/Customer-reducer"
import RestaurantReducer from "./Restaurant/Restaurant-reducers";
const rootReducer = combineReducers({
  cart: cartReducer,
  SignUpForm:SignUpReducer,
  Login:LoginReducer,
  Customer:CustomerReducer,
  Restaurant:RestaurantReducer
});

export default rootReducer;
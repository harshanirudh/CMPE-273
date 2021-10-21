import { combineReducers } from "redux";

import cartReducer from './Cart/Cart-reducer'
import LoginReducer from './Login/Login-reducers'
import SignUpReducer from "./Signup/Signup-reducer";
import CustomerReducer from "./Customer/Customer-reducer"
const rootReducer = combineReducers({
  cart: cartReducer,
  SignUpForm:SignUpReducer,
  Login:LoginReducer,
  Customer:CustomerReducer
});

export default rootReducer;
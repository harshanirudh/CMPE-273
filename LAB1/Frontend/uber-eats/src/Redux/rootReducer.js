import { combineReducers } from "redux";

import cartReducer from './Cart/Cart-reducer'
import LoginReducer from "./Login/Login-reducer";
import SignUpReducer from "./Signup/Signup-reducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  SignUpForm:SignUpReducer,
  Login:LoginReducer
});

export default rootReducer;
import * as actionTypes from './Login-types'
const INITIAL_STATE={
    isCustomerAuthenticated:false,
    isRestaurantAuthenticated:false,
    userEmail:null,
    id:null
}

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.LOGIN_CUSTOMER:
            console.log("customer login",action.payload)
            return {
                isCustomerAuthenticated: action.payload.customerLogin.isCustomerAuthenticated,
                isRestaurantAuthenticated:false,
                userEmail:action.payload.customerLogin.userEmail,
                id:action.payload.customerLogin.id,
                token:action.payload.customerLogin.token
            }
        case actionTypes.LOGIN_RESTAURANT:
             return {
                isCustomerAuthenticated:false,
                isRestaurantAuthenticated: action.payload.restaurantLogin.isRestaurantAuthenticated,
                userEmail:action.payload.restaurantLogin.userEmail,
                id:action.payload.restaurantLogin.id,
                token:action.payload.customerLogin.token
            }
        case actionTypes.LOGOUT_CUSTOMER:
            return{
                isCustomerAuthenticated:false,
                isRestaurantAuthenticated:false,
                userEmail:null,
                id:null,
                token:null
            }
            case actionTypes.LOGOUT_RESTAURANT:
                return{
                    isCustomerAuthenticated:false,
                    isRestaurantAuthenticated:false,
                    userEmail:null,
                    id:null,
                    token:null
                }
        default:
            return state;
    }
}

export default LoginReducer;
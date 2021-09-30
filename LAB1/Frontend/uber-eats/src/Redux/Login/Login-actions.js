import * as actionTypes from "./Login-types"

export const customerLogin=(loginDetails)=>{
    return {
        type: actionTypes.LOGIN_CUSTOMER,
        payload:{
            customerLogin:loginDetails
        }
    }
}

export const restaurantLogin=(loginDetails)=>{
    return {
        type: actionTypes.LOGIN_RESTAURANT,
        payload:{
            restaurantLogin:loginDetails
        }
    }
}
export const customerLogout=()=>{
    return {type:actionTypes.LOGOUT_CUSTOMER}
}
export const restaurantLogout=()=>{
    return {type:actionTypes.LOGOUT_RESTAURANT}
}

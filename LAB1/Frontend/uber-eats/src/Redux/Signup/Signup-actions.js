import * as actionTypes from "./Signup-types"

export const customerSignUp=(customerForm)=>{
    return {
        type: actionTypes.SIGNUP_CUSTOMER,
        payload:{
            form:customerForm
        }
    }
}

export const restaurantSignUp=(restaurantForm)=>{
    return {
        type: actionTypes.SIGNUP_RESTAURANT,
        payload:{
            form:restaurantForm
        }
    }
}
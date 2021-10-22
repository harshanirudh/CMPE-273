import * as actionTypes from "./Cart-types";

export const incrementCounter=()=>{
    return {
        type: actionTypes.INCREMENT_COUNTER,
    }
}

export const decrementCounter=()=>{
    return {
        type: actionTypes.DECREMENT_COUNTER,
    }
}
export const resetCounter=()=>{
    return{
        type:actionTypes.RESET_COUNTER
    }
}
export const addToCart=(list)=>{
    return{
        type:actionTypes.ADD_TO_CART,
        payload:{
            list:list
        }
    }
}
export const removeFromCart=(list)=>{
    return{
        type:actionTypes.REMOVE_FROM_CART,
        payload:{
            list:list
        }
    }
}
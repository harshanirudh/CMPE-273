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
import * as actionTypes from './Cart-types'
const INITIAL_STATE={
    cartCounter: sessionStorage.getItem('counter')?parseInt(sessionStorage.getItem('counter')):0
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.INCREMENT_COUNTER:
            // console.log('cart',state.cartCounter)
            return {cartCounter: state.cartCounter+1}
        case actionTypes.DECREMENT_COUNTER:
            return {cartCounter:state.cartCounter-1}
        case actionTypes.RESET_COUNTER:
            sessionStorage.clear()
            return {cartCounter:0}
        default:
            return state;
    }
}

export default cartReducer;
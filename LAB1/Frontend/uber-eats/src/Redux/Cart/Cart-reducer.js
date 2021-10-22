import * as actionTypes from './Cart-types'
const INITIAL_STATE = {
    cartCounter: sessionStorage.getItem('counter') ? parseInt(sessionStorage.getItem('counter')) : 0,
    cartDetails: null
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT_COUNTER:
            // console.log('cart',state.cartCounter)
            return {
                cartCounter: state.cartCounter + 1,
                cartDetails: state.cartDetails
            }
        case actionTypes.DECREMENT_COUNTER:
            return {
                cartCounter: state.cartCounter - 1,
                cartDetails: state.cartDetails
            }
        case actionTypes.RESET_COUNTER:
            sessionStorage.clear()
            return {
                cartCounter: 0,
                cartDetails: null
            }
        case actionTypes.ADD_TO_CART:
            return {
                cartCounter: state.cartCounter,
                cartDetails: action.payload.list
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                cartCounter: state.cartCounter,
                cartDetails: action.payload.list
            }
        default:
            return state;
    }
}

export default cartReducer;
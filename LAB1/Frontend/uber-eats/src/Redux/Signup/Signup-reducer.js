import * as actionTypes from './Signup-types'
const INITIAL_STATE={
    SignUpForm:null
}

const SignUpReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.SIGNUP_CUSTOMER:
            // console.log('cart',state.cartCounter)
            return {SignUpForm: action.payload.form}
        case actionTypes.SIGNUP_RESTAURANT:
            return {SignUpForm: action.payload.form}
        default:
            return state;
    }
}

export default SignUpReducer;
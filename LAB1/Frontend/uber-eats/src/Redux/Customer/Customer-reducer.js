import * as actionTypes from './Customer-types'
const INITIAL_STATE={
    masterRestList:[]
}

const CustomerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.SAVE_MASTER_RESTUARANT_LIST:
        console.log(action)    
        return {
                masterRestList:action.payload.list
            }
        default:
            return state;
    }
}

export default CustomerReducer;
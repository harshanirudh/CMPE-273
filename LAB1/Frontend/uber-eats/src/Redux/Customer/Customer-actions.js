import * as actionTypes from "./Customer-types";

export const saveRestaurantList=(list)=>{
    return {
        type: actionTypes.SAVE_MASTER_RESTUARANT_LIST,
        payload:{
            list:list
        }
    }
}

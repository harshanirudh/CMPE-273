import * as actionTypes from './Restaurant-types'

export const saveDishDetails=(details)=>{
    return{
        type:actionTypes.SAVE_DISH_DETAILS,
        payload:{
            details:details
        }
    }
}
export const getDishDetails=(details)=>{
    return{
        type:actionTypes.GET_DISH_DETAILS,
        payload:{
            details:details
        }
    }
}
export const getProfileDetails=(details)=>{
    return{
        type:actionTypes.GET_RPROFILE_DETAILs,
        payload:{
            details:details
        }
    }
}
export const saveProfileDetails=(details)=>{
    return{
        type:actionTypes.SAVE_RPROFILE_DETAILs,
        payload:{
            details:details
        }
    }
}

export const getDishesList=(list)=>{
    return{
        type:actionTypes.GET_DISHESH_LIST,
        payload:{
            list:list
        }
    }
}

export const getRImages=(list)=>{
    return{
        type:actionTypes.GET_RIMAGES,
        payload:{
            list:list
        }
    }
}

export const saveRImages=(list)=>{
    return{
        type:actionTypes.SAVE_RIMAGES,
        payload:{
            list:list
        }
    }
}

export const getROrdersList=(list)=>{
    return{
        type:actionTypes.GET_RORDERS_LIST,
        payload:{
            list:list
        }
    }
}

export const updateROrdersList=(list)=>{
    return{
        type:actionTypes.UPDATE_RORDERS_LIST,
        payload:{
            list:list
        }
    }
}
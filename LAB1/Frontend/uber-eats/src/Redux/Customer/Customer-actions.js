import * as actionTypes from "./Customer-types";

export const getRestaurantList=(list)=>{
    return {
        type: actionTypes.GET_MASTER_RESTUARANT_LIST,
        payload:{
            list:list
        }
    }
}
export const saveRestaurantList=(list)=>{
    return {
        type: actionTypes.SAVE_MASTER_RESTUARANT_LIST,
        payload:{
            list:list
        }
    }
}

export const getCustomerProfile=(details)=>{
    return{
        type:actionTypes.GET_CUSTOMER_PROFILE,
        payload:{
            details:details
        }
    }
}
export const saveCustomerProfile=(details)=>{
    return{
        type:actionTypes.SAVE_CUSTOMER_PROFILE,
        payload:{
            details:details
        }
    }
}

export const getAllOrders=(list)=>{
    return{
        type:actionTypes.GET_ALL_ORDERS,
        payload:{
            list:list
        }
    }
}
export const getDeliveryAddress=(list)=>{
    return {
        type:actionTypes.GET_DELIVERY_ADDRESS,
        payload:{
            list:list
        }
    }
}
export const saveDeliveryAddress=(list)=>{
    return {
        type:actionTypes.SAVE_DELIVERY_ADDRESS,
        payload:{
            list:list
        }
    }
}
export const getFavouritesRest=(list)=>{
    return{
        type:actionTypes.GET_FAVOURITES,
        payload:{
            list:list
        }
    }
}
export const addToFavourites=(list)=>{
    return{
        type:actionTypes.SAVE_TO_FAVOURITES,
        payload:{
            list:list
        }
    }
}
import * as actionTypes from './Customer-types'
const INITIAL_STATE = {
    masterRestList: [],
    customerProfile: null,
    orders: [],
    deliveryAddress: [],
    favourites:[]
}

const CustomerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.GET_MASTER_RESTUARANT_LIST:
            return {
                masterRestList: action.payload.list,
                customerProfile: state.customerProfile,
                orders: state.orders,
                deliveryAddress: state.deliveryAddress,
                favourites:state.favourites
            }
        case actionTypes.SAVE_MASTER_RESTUARANT_LIST:
            return {
                masterRestList: action.payload.list,
                customerProfile: state.customerProfile,
                orders: state.orders,
                deliveryAddress: state.deliveryAddress,
                favourites:state.favourites
            }

        case actionTypes.GET_CUSTOMER_PROFILE:
            return {
                masterRestList: state.masterRestList,
                customerProfile: action.payload.details,
                orders: state.orders,
                deliveryAddress: state.deliveryAddress,
                favourites:state.favourites
            }
        case actionTypes.SAVE_CUSTOMER_PROFILE:
            return {
                masterRestList: state.masterRestList,
                customerProfile: action.payload.details,
                orders: state.orders,
                deliveryAddress: state.deliveryAddress,
                favourites:state.favourites
            }
        case actionTypes.GET_ALL_ORDERS:
            return {
                masterRestList: state.masterRestList,
                customerProfile: state.customerProfile,
                orders: action.payload.list,
                deliveryAddress: state.deliveryAddress,
                favourites:state.favourites
            }

        case actionTypes.GET_DELIVERY_ADDRESS:
            return {
                masterRestList: state.masterRestList,
                customerProfile: state.customerProfile,
                orders: state.orders,
                deliveryAddress: action.payload.list,
                favourites:state.favourites
            }
        case actionTypes.SAVE_DELIVERY_ADDRESS:
            return {
                masterRestList: state.masterRestList,
                customerProfile: state.customerProfile,
                orders: state.orders,
                deliveryAddress: action.payload.list,
                favourites:state.favourites
            }

        case actionTypes.GET_FAVOURITES:
            return {
                masterRestList: state.masterRestList,
                customerProfile: state.customerProfile,
                orders: state.orders,
                deliveryAddress: state.deliveryAddress,
                favourites: action.payload.list
            }
        case actionTypes.SAVE_TO_FAVOURITES:
            return {
                masterRestList: state.masterRestList,
                customerProfile: state.customerProfile,
                orders: state.orders,
                deliveryAddress: state.deliveryAddress,
                favourites: action.payload.list
            }

        default:
            return state;
    }
}

export default CustomerReducer;
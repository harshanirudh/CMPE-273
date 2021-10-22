import * as actionTypes from './Restaurant-types'
const INITIAL_STATE={
    DishDetails:null,
    profileDetails:null,
    DishesList:[],
    RImages:[],
    ordersList:[]
}

const RestaurantReducer=(state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.GET_DISH_DETAILS:
        return{
            DishDetails:action.payload.details,
            profileDetails:state.profileDetails,
            DishesList:state.DishesList,
            RImages:state.RImages,
            ordersList:state.ordersList
        }
        case actionTypes.SAVE_DISH_DETAILS:
        return{
            DishDetails:action.payload.details,
            profileDetails:state.profileDetails,
            DishesList:state.DishesList,
            RImages:state.RImages,
            ordersList:state.ordersList
        }
        case actionTypes.GET_RPROFILE_DETAILs:
            return{
                DishDetails:state.DishDetails,
                profileDetails:action.payload.details,
                DishesList:state.DishesList,
                RImages:state.RImages,
                ordersList:state.ordersList
            }
        case actionTypes.SAVE_RPROFILE_DETAILs:
            return{
                DishDetails:state.DishDetails,
                profileDetails:action.payload.details,
                DishesList:state.DishesList,
                RImages:state.RImages,
                ordersList:state.ordersList
            }
        case actionTypes.GET_DISHESH_LIST:
            return{
                DishDetails:state.DishDetails,
                profileDetails:state.profileDetails,
                DishesList:action.payload.list,
                RImages:state.RImages,
                ordersList:state.ordersList
            }
        case actionTypes.GET_RIMAGES:
            return{
                DishDetails:state.DishDetails,
                profileDetails:state.profileDetails,
                DishesList:state.DishesList,
                RImages:action.payload.list,
                ordersList:state.ordersList
            }
        case actionTypes.SAVE_RIMAGES:
            return{
                DishDetails:state.DishDetails,
                profileDetails:state.profileDetails,
                DishesList:state.DishesList,
                RImages:action.payload.list,
                ordersList:state.ordersList
            }
        case actionTypes.GET_RORDERS_LIST:
            return{
                DishDetails:state.DishDetails,
                profileDetails:state.profileDetails,
                DishesList:state.DishesList,
                RImages:state.RImages,
                ordersList:action.payload.list
            }
        case actionTypes.UPDATE_RORDERS_LIST:
            return{
                DishDetails:state.DishDetails,
                profileDetails:state.profileDetails,
                DishesList:state.DishesList,
                RImages:state.RImages,
                ordersList:action.payload.list
            }
        default:
            return state;
    }
}

export default RestaurantReducer
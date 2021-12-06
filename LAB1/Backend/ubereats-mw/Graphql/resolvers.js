const CustomerModel = require("../models/CustomerModel");
const CustomerResolvers = require("./resolvers/CustomerResolvers");
const LoginResolver = require("./resolvers/LoginResolvers");
const OrdersResolver = require("./resolvers/OrdersResolvers");
const RestaurantResolver = require("./resolvers/RestaurantResolvers");
const FavouriteResolver=require("./resolvers/FavouritesResolvers");
const DishesResolver = require("./resolvers/DishesResolver");
const DeliveryAddressResolvers = require("./resolvers/DeliveryAddressResolvers");

const resolvers={
    Query:{
        ...CustomerResolvers.Query,
        ...RestaurantResolver.Query,
        ...OrdersResolver.Query,
        ...LoginResolver.Query,
        ...FavouriteResolver.Query,
        ...DishesResolver.Query,
        ...DeliveryAddressResolvers.Query
    },
    Mutation:{
        ...CustomerResolvers.Mutation,
        ...RestaurantResolver.Mutation,
        ...OrdersResolver.Mutation,
        ...LoginResolver.Mutation,
        ...FavouriteResolver.Mutation,
        ...DishesResolver.Mutation,
        ...DeliveryAddressResolvers.Mutation
    }
}
module.exports=resolvers
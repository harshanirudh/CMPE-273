const {ApolloServer,gql}=require('apollo-server')
const typeDefs=gql`
type Customers{
    _id:String
    FNAME:String
    LNAME:String
    EMAIL:String
    PASS:String
    NICKNAME:String
    ABOUT:String
    PROFILE_PIC:String
    STREET:String
    CITY:String
    STATE:String
    COUNTRY:String
    DOB:String
    ZIPCODE:String
    PHONE:String
}
type Restaurant{
    _id:String
    RNAME:String
    EMAIL:String
    PASS:String
    ABOUT:String
    STREET:String
    CITY:String
    STATE:String
    COUNTRY:String
    PHONE:String
    ZIPCODE:String
    RDESCRIPTION:String
    START_TIME:String
    END_TIME:String
    RDELIVERY_MODE:String
    IMAGE:[String]
}
type Orders{
    _id:String
    REST_ID:String,
    RNAME:String
    CUST_ID:String,
    ORD_STATUS:String
    ORD_TYPE:String
    AMOUNT:String
    DISH_DETAILS:[Dish]
    ORD_TIMESTAMP:String
    ORD_DEL_ADDRESS:String
    SPECIAL_INSTRUCTIONS:String
}
type Dish{
    _id:String
    REST_ID:String,
    DISH_NAME:String
    INGREDIENTS:String
    IMAGE:String
    PRICE:String
    DISH_DESCR:String
    CATEGORY:String
    DISH_TYPE:String
    quantity:String
}
input DishInput{
    _id:String
    REST_ID:String,
    DISH_NAME:String
    INGREDIENTS:String
    IMAGE:String
    PRICE:String
    DISH_DESCR:String
    CATEGORY:String
    DISH_TYPE:String
    quantity:Int
}
type CustomerLogin{
    authenticated :Boolean
    cust_id:String
    token:String
}
type RestaurantLogin{
    authenticated :Boolean
    rest_id:String
    token:String
}
type Favs{
    CUST_ID:String
    REST_ID:String
}
type DeliveryAddress{
    CUST_ID:String
    CNAME:String
    ADDRESS:String
    CITY:String
    ZIPCODE:String
}
type Query{
    getAllCustomerUsers:[Customers]
    getCustomerById(id:String!):Customers
    getCustomerLocation(custId:String):String
    getAllRestaurants:[Restaurant]
    getRestaurantById(id:String):Restaurant
    getRestImage(restId:String):[String]
    getOrdersForCustomer(custId:String):[Orders]
    getOrdersForRestaurant(restId:String):[Orders]
    customerLogin(email:String,pass:String):CustomerLogin
    RestaurantLogin(email:String,pass:String):RestaurantLogin
    getFavouritesForCustomer(custId:String):[String]
    getFavsDetails(custId:String):[Restaurant]
    getDIshById(dishId:String,restId:String):[Dish]
    getAllDishes(restId:String):[Dish]
    searchRestByDish(dishSeq:String):[String]
    searchRestByDishType(type:String):[String]
    getDeliveryAddress(custId:String):[DeliveryAddress]
}
type Mutation{
    saveNewCustomer(fname:String, lname:String, email:String, pass:String ):String
    updateCustomer(id:String,fname:String, lname:String, email:String, nickname:String, about:String, profile_pic:String, add:String, city:String, state:String, country:String, dob:String, zipcode:String, phone:String):String
    saveNewRestaurant(add:String, city:String, country:String, email:String, pass:String, rname:String, state:String, zipcode:String ):String
    updateRestaurant(id:String,add:String, city:String, state:String, country:String, zipcode:String, email:String, rname:String, desc:String, phone:String, stime:String, etime:String, rdeliverymode:String ):String
    saveImage(restId:String,img:String):Restaurant
    saveNewOrder(rest_id:String,rname:String,cust_id:String,order_type:String,amount:String,dishes:[DishInput],ts:String,address:String,specialInstructions:String):Orders
    updateOrderStatus(orderId:String,status:String):Orders
    saveFavs(custId:String,restId:String):Favs
    saveDish(restId:String,dname:String, ingre:String, dimg:String, dprice:String, ddesc:String, dcat:String, dtype:String):Dish
    updateDish(restId:String,dishId:String,dname:String, ingre:String, dimg:String, dprice:String, ddesc:String, dcat:String, dtype:String ):String
    saveNewDeliveryAddress(custId:String,name:String,add:String,city:String,zipcode:String):DeliveryAddress
}
`
module.exports=typeDefs
var connection =  new require('./kafka/Connection');
//topics files
var mongoConnection=require('./db-config').connection
var DeliveryAddress = require('./services/DeliveryAddress');
var Favourites=require('./services/Favourites')
var Dishes=require('./services/Dishes')
var Users=require('./services/users')
var RestImages=require('./services/RestImages')
var Orders=require('./services/Orders')
var Login=require('./services/Login')
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log(`server is running for ${topic_name}`);
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
mongoConnection.then((res)=>{
    console.log("Connection Succesful")
  })
/**Delivery Address */
handleTopicRequest("post_delivery_address",DeliveryAddress.handle_post_delivery_address)
handleTopicRequest("get_delivery_address",DeliveryAddress.handle_get_delivery_address)

/**Favourites */
handleTopicRequest("save_favourites",Favourites.handle_save_favourites)
handleTopicRequest("get_favourites_custId",Favourites.handle_get_favourites_customer)
handleTopicRequest("get_favourites_details_custId",Favourites.handle_get_favourites_details_customer)

/**Dishes */
handleTopicRequest("save_dish",Dishes.handle_save_new_dish)
handleTopicRequest("update_dish",Dishes.handle_update_dish)
handleTopicRequest("get_dish_byId",Dishes.handle_get_dish_ById)
handleTopicRequest("get_all_dishes",Dishes.handle_get_all_dishes)
handleTopicRequest("searchBy_dishName",Dishes.handle_search_rest_ByDish)
handleTopicRequest("searchBy_dishType",Dishes.handle_search_rest_ByType)

/**Users */
handleTopicRequest("get_customer_byId",Users.handle_get_customer_byId)
handleTopicRequest("save_customer",Users.handle_save_customer)
handleTopicRequest("update_customer",Users.handle_update_customer)
handleTopicRequest("get_restaurants_list",Users.handle_get_all_restaurants)
handleTopicRequest("customer_location",Users.handle_get_customerLocation)
handleTopicRequest("get_restaurants_byId",Users.handle_get_restaurant_byId)
handleTopicRequest("save_restaurant",Users.handle_save_new_restaurant)
handleTopicRequest("update_restaurant",Users.handle_update_restaurant)

/**Rest Images */
handleTopicRequest("save_restImage",RestImages.handle_save_image)
handleTopicRequest("get_restImage",RestImages.handle_get_image)

/**Orders */
handleTopicRequest("save_order",Orders.handle_save_new_order)
handleTopicRequest("get_orders_customer",Orders.handle_get_orders_customer)
handleTopicRequest("get_orders_restaurant",Orders.handle_get_orders_restaurant)
handleTopicRequest("update_orderStatus",Orders.handle_update_orderStatus)

/**Login */
handleTopicRequest("login_restaurant",Login.handle_restaurant_login)
handleTopicRequest("login_customer",Login.handle_customer_login)
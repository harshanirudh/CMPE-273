export const GET_CUSTOMER_PROFILE=`query GetCustomerProfile($CUST_ID: String!) {
    getCustomerById(id: $CUST_ID) {
      _id
      FNAME
      LNAME
      EMAIL
      PASS
      NICKNAME
      ABOUT
      PROFILE_PIC
      STREET
      CITY
      STATE
      COUNTRY
      DOB
      ZIPCODE
      PHONE
    }
  }`;
  export const GET_CUST_LOCATION_QUERY=`query customerLoc($custId: String) {
    getCustomerLocation(custId: $custId)
  }`;
  export const GET_ALL_RESTAURANTS_QUERY=`query GetAllRestaurants {
    getAllRestaurants {
      RNAME
      EMAIL
      IMAGE
      _id
      PASS
      ABOUT
      STREET
      CITY
      STATE
      COUNTRY
      PHONE
      ZIPCODE
      RDESCRIPTION
      START_TIME
      END_TIME
      RDELIVERY_MODE
    }
  }`;

  export const GET_RESTAURANT_BY_ID=`query GetRestaurantById($restid: String) {
    getRestaurantById(id: $restid) {
      _id
      RNAME
      EMAIL
      PASS
      ABOUT
      STREET
      CITY
      STATE
      COUNTRY
      PHONE
      ZIPCODE
      RDESCRIPTION
      START_TIME
      END_TIME
      RDELIVERY_MODE
      IMAGE
    }
  }`
  export const GET_REST_IMAGES=`query GetRestImages($restId: String) {
    getRestImage(restId: $restId)
  }`
  export const GET_CUSTOMER_ORDERS_QUERY=`query GetOrdersForCustomer($custId: String) {
    getOrdersForCustomer(custId: $custId) {
      _id
      REST_ID
      RNAME
      CUST_ID
      ORD_STATUS
      ORD_TYPE
      AMOUNT
      DISH_DETAILS {
        _id
        REST_ID
        DISH_NAME
        INGREDIENTS
        IMAGE
        PRICE
        DISH_DESCR
        CATEGORY
        DISH_TYPE
        quantity
      }
      ORD_TIMESTAMP
      ORD_DEL_ADDRESS
      SPECIAL_INSTRUCTIONS
      
    }
  }`
  export const GET_RESTAURANT_ORDERS_QUERY=`query GetOrdersForRestaurant($restId: String) {
    getOrdersForRestaurant(restId: $restId) {
      _id
      REST_ID
      RNAME
      CUST_ID
      ORD_STATUS
      ORD_TYPE
      AMOUNT
      DISH_DETAILS {
        _id
        REST_ID
        DISH_NAME
        INGREDIENTS
        IMAGE
        PRICE
        DISH_DESCR
        CATEGORY
        DISH_TYPE
        quantity
      }
      ORD_TIMESTAMP
      ORD_DEL_ADDRESS
      SPECIAL_INSTRUCTIONS
    }
  }`
  export const CUSTOMER_LOGIN_QUERY=`query CustomerLogin($email: String, $pass: String) {
    customerLogin(email: $email, pass: $pass) {
      authenticated
      cust_id
      token
    }
  }`;
  export const RESTAURANT_LOGIN=`query RestaurantLogin($email: String, $pass: String) {
    RestaurantLogin(email: $email, pass: $pass) {
      authenticated
      rest_id
      token
    }
  }`;
  export const GET_CUSTOMER_FAVS_QUERY=`query GetFavsForCustomer($custId: String) {
    getFavouritesForCustomer(custId: $custId)
  }`;
  export const GET_CUST_FAVS_REST_DETAILS=`query GetFavsDetails($custId: String) {
    getFavsDetails(custId: $custId) {
      _id
      RNAME
      EMAIL
      PASS
      ABOUT
      STREET
      CITY
      STATE
      COUNTRY
      PHONE
      ZIPCODE
      RDESCRIPTION
      START_TIME
      END_TIME
      RDELIVERY_MODE
      IMAGE
    }
  }`;
  export const GET_DISH_BY_ID_QUERY=`query GetDishById($dishId: String, $restId: String) {
    getDIshById(dishId: $dishId, restId: $restId) {
      _id
      REST_ID
      DISH_NAME
      INGREDIENTS
      IMAGE
      PRICE
      DISH_DESCR
      CATEGORY
      DISH_TYPE
      quantity
    }
  }`;
  export const GET_ALL_DISHES=`query GetAllDishes($restId: String) {
    getAllDishes(restId: $restId) {
      _id
      REST_ID
      DISH_NAME
      INGREDIENTS
      IMAGE
      PRICE
      DISH_DESCR
      CATEGORY
      DISH_TYPE
      quantity
    }
  }`;
  export const SEARCH_REST_BY_DISH_NAME_QUERY=`query Query($dishSeq: String) {
    searchRestByDish(dishSeq: $dishSeq)
  }`;
  export const SEARCH_REST_BY_DISH_TYPE=`query SearchRestByDishType($type: String) {
    searchRestByDishType(type: $type)
  }`;
  export const GETALL_DELIVERY_QUERY=`query GetDeliveryAddress($custId: String) {
    getDeliveryAddress(custId: $custId) {
      CUST_ID
      CNAME
      ADDRESS
      CITY
      ZIPCODE
    }
  }`;


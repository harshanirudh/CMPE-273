export const UPDATE_CUST_PROFILE_QUERY=`mutation updateCustomer($id:String,$fname:String, $lname:String, $email:String, $nickname:String, $about:String, $profile_pic:String, $add:String, $city:String, $state:String, $country:String, $dob:String, $zipcode:String, $phone:String) {
    updateCustomer(id:$id,fname:$fname, lname:$lname, email:$email, nickname:$nickname, about:$about, profile_pic:$profile_pic, add:$add, city:$city, state:$state, country:$country, dob:$dob, zipcode:$zipcode, phone:$phone)
}`
export const SAVE_REST=`mutation saveRest($add: String, $city: String, $country: String, $email: String, $pass: String, $rname: String, $state: String, $zipcode: String) {
    saveNewRestaurant(add: $add, city: $city, country: $country, email: $email, pass: $pass, rname: $rname, state: $state, zipcode: $zipcode)
  }`
  export const UPDATE_REST=`mutation UpdateRestaurant($updateRestaurantId: String, $add: String, $city: String, $state: String, $country: String, $zipcode: String, $email: String, $rname: String, $desc: String, $phone: String, $stime: String, $etime: String, $rdeliverymode: String) {
    updateRestaurant(id: $updateRestaurantId, add: $add, city: $city, state: $state, country: $country, zipcode: $zipcode, email: $email, rname: $rname, desc: $desc, phone: $phone, stime: $stime, etime: $etime, rdeliverymode: $rdeliverymode)
  }`;
  export const SAVE_REST_IMG=`mutation SaveImage($restId: String, $img: String) {
    saveImage(restId: $restId, img: $img) {
      _id
    }
  }`
  export const SAVE_NEW_ORDER_MUTATION=`mutation SaveNewOrder($restId: String, $rname: String, $custId: String, $orderType: String, $amount: String, $dishes: [DishInput], $ts: String, $address: String, $specialInstructions: String) {
    saveNewOrder(rest_id: $restId, rname: $rname, cust_id: $custId, order_type: $orderType, amount: $amount, dishes: $dishes, ts: $ts, address: $address, specialInstructions: $specialInstructions) {
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
  }`;
  export const UPDATE_ORDER_STATUS_MUTATION=`mutation Mutation($orderId: String, $status: String) {
    updateOrderStatus(orderId: $orderId, status: $status) {
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
  }`;
  export const SAVE_FAVS_MUTATION=`mutation SaveFavs($custId: String, $restId: String) {
    saveFavs(custId: $custId, restId: $restId) {
      CUST_ID
      REST_ID
    }
  }`;

  export const UPDATE_DISH_MUTATION=`mutation UpdateDish($restId: String, $dishId: String, $dname: String, $ingre: String, $dimg: String, $dprice: String, $ddesc: String, $dcat: String, $dtype: String) {
    updateDish(restId: $restId, dishId: $dishId, dname: $dname, ingre: $ingre, dimg: $dimg, dprice: $dprice, ddesc: $ddesc, dcat: $dcat, dtype: $dtype) 
  }`;
  export const SAVE_DISH_MUTATION=`mutation SaveDish($restId: String, $dname: String, $ingre: String, $dimg: String, $dprice: String, $ddesc: String, $dcat: String, $dtype: String) {
    saveDish(restId: $restId, dname: $dname, ingre: $ingre, dimg: $dimg, dprice: $dprice, ddesc: $ddesc, dcat: $dcat, dtype: $dtype) {
      _id
      REST_ID
      DISH_NAME
      INGREDIENTS
      IMAGE
      PRICE
      DISH_DESCR
      CATEGORY
      DISH_TYPE
    }
  }`;
  export const SAVE_DELIVERY_ADDRESS_MUTATION=`mutation SaveNewDeliveryAddress($custId: String, $name: String, $add: String, $city: String, $zipcode: String) {
    saveNewDeliveryAddress(custId: $custId, name: $name, add: $add, city: $city, zipcode: $zipcode) {
      CUST_ID
      CNAME
      ADDRESS
      CITY
      ZIPCODE
    }
  }`;
  export const SAVE_NEW_CUST_MUTATION=`mutation SaveNewCustomer($fname: String, $lname: String, $email: String, $pass: String) {
    saveNewCustomer(fname: $fname, lname: $lname, email: $email, pass: $pass)
  }
  `;

  
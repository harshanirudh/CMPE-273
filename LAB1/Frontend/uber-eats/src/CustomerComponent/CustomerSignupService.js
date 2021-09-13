
var axios = require("axios").default;
var {baseUrl}=require('../apiConfig')

export function addNewCustomer(values) {
    let url=baseUrl+'/users/customer'
   axios.post(url,values).then(res=>console.log(res))
    .catch((err)=>{
        console.log(`error ${err}`)
    })
   console.log(values);
}



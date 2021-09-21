var pool = require('./../db-config')
async function getCustomerUsers ()  {
    let query = 'select * from customer_users'
    let result=pool.query(query);
    return result.then((res)=>res[0])
};
async function getCustomerById(id){
    let query = 'select CUST_ID,FNAME,LNAME,EMAIL,NICKNAME,ABOUT,PROFILE_PIC,STREET,CITY,STATE,COUNTRY,ZIPCODE,PHONE,DOB from customer_users where cust_id=?';
    let result =pool.query(query, id);
    return result.then((res)=>res[0])
}

module.exports = {
    getCustomerUsers,
    getCustomerById
}
var pool = require('./../db-config')
async function getCustomerUsers ()  {
    let query = 'select * from customer_users'
    let result=pool.query(query);
    return result.then((res)=>res[0])
};
async function getCustomerById(id){
    let query = 'select * from customer_users where cust_id=?';
    let result =pool.execute(query, id);
    return result.then((res)=>res[0])
}

module.exports = {
    getCustomerUsers,
    getCustomerById
}
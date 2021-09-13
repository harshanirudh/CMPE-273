const mysql=require('mysql2');

var connectionPool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'BiryaniBois@1008',
    database:'uber_eats',
    connectionLimit: 3,
    multipleStatements: true

});


module.exports=connectionPool.promise();
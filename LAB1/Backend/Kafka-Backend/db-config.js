const mysql=require('mysql2');

// var connectionPool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'BiryaniBois@1008',
//     database:'uber_eats',
//     connectionLimit: 10,
//     multipleStatements: true

// });
// var connectionPool=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'BiryaniBois@1008',
//     database:'uber_eats',
// })
// var connectionPool=mysql.createPool({
//     host:'ubereats-harshaanirudh.ct8qfik9jl0i.us-west-1.rds.amazonaws.com',
//     user:'admin',
//     password:'BiryaniBois',
//     database:'uber_eats',
//     connectionLimit: 3,
//     multipleStatements: true

// });

const mongoose=require("mongoose")
const uri = "mongodb+srv://root:BiryaniBois@uber-eats-harsha.og8pb.mongodb.net/uber-eats?retryWrites=true&w=majority";
const connection=mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true , maxPoolSize: 10 });
module.exports={
    connection
    // connectionPool
}
// module.exports=connectionPool.promise();
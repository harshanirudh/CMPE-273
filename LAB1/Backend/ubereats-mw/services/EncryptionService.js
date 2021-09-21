const bcrypt = require('bcrypt');
const saltRounds = 5;
const plainText = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

async function hashPassword(plainText){
     let hash=await bcrypt.hash(plainText,saltRounds)
     console.log(hash)
}

async function checkPass(encrypted){
    try{
    let plaintext= await bcrypt.compare('hash@123',encrypted)
    console.log(plaintext)}
    catch(err){
        console.log(err)
    }
}
checkPass("$2b$05$TYoZt0FcgrREUQMtMc6kfOLhCZusN/LIqvAoKvW.KHVFYXzxDXYv.")
 hashPassword(plainText)
//  console.log(hashPassword(plainText))
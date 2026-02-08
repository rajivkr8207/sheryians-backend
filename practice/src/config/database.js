const mongoose = require('mongoose')


function ConnectDB(){
    mongoose.connect(process.env.MONGODB)
    .then(()=>{
        console.log(`database connected properly`);
    })
    .catch(()=>{
        console.log(`databse connection failed`);
    })
}

module.exports = ConnectDB;
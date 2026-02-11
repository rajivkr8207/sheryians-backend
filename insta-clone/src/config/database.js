const mongoose = require('mongoose')

function ConnectDB(){
    mongoose.connect(process.env.MONGODB)
    .then(()=>{
        console.log(`MONGODB is connected successfully`);
    })
    .catch(err=>{
        console.log(err);
        process.exit(1)
    })
}
module.exports = ConnectDB;
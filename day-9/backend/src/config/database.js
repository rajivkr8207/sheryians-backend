const mongoose = require('mongoose')


function ConnectDb() {
    mongoose.connect(process.env.MONGODB)
    .then(()=>{
        console.log('MongoDB connection successfuly');
    })
    
}


module.exports = ConnectDb;


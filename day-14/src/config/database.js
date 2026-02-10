const mongoose = require('mongoose')

function ConnectDB() {
    mongoose.connect(process.env.MONGODB)
    .then(()=>{
        console.log('MongoDB connect successfully');
    })
    
}

module.exports = ConnectDB;
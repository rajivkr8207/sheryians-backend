const mongoose = require('mongoose')


 function connectDB(){
    mongoose.connect(process.env.MONGODB)
    .then(()=>{
        console.log('Database connect successfuly');
    })
    .catch(()=>{
        console.log('Database connected failed');
    })
}
module.exports = connectDB
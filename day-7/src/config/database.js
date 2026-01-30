const mongoose = require('mongoose');


function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Database is connected successfully');
        })
        .catch(() => {
            process.exit(1)
        })
}

module.exports = connectDB;
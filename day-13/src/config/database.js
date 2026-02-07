const mongoose = require('mongoose');


function connectDB() {
    mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch((err) => {
            console.log('MongoDB connection failed:', err.message);
            process.exit(1);
        });
}

module.exports = connectDB;



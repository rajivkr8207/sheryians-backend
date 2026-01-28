const app = require('./src/app')
const mongoose = require('mongoose')
const PORT = 3000

function connectDB() {
    mongoose.connect('mongodb+srv://mahakalrj8207_db_user:LzcmjoaQZEPe178j@cluster0.gkk6t0u.mongodb.net/day-6')
        .then(() => {
            console.log('Database is connect successfully');
        })
        .catch(() => {
            process.exit(1)
        })
}
connectDB()

app.listen(PORT, (req, res) => {
    console.log(`server is running on ${PORT} port`);
})

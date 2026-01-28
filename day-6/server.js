const app = require('./src/app')
const mongoose = require('mongoose')
const PORT = 3000

function connectDB() {
    mongoose.connect('')
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

const app = require('./src/app.js')
const PORT = 3000
const connectDB = require('./src/config/database.js')
require('dotenv').config()


connectDB()

app.listen(PORT, (req, res) => {
    console.log(`server is running on ${PORT} port`);
})
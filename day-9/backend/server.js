const app = require('./src/app.js')
const dotenv = require('dotenv')
const ConnectDb = require('./src/config/database.js')
dotenv.config()
const PORT = process.env.PORT || 3000

ConnectDb()
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT} port`);
})
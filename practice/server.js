require('dotenv').config('./.env')
const app = require('./src/app')
const ConnectDB = require('./src/config/database')
const PORT = process.env.PORT



ConnectDB()
app.listen(PORT, (req,res)=>{
    console.log(`server is running on ${PORT} port`);
})
process.env.TZ = "Asia/Kolkata";
const app = require('./src/app.js')
const PORT = process.env.PORT
const connectDB = require('./src/config/database.js')

connectDB()
app.listen(PORT, (req,res)=>{
    console.log(`server is running on ${3000} port`);
})
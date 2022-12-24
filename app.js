const express = require('express')
const ejs = require('ejs')
const path = require('path')
const uploadRoute = require('./router/upload')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary')
dotenv.config()



//Database connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(()=>console.log("Connected to database.")).catch(err => console.log(err))

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_ID,
  api_secret: process.env.API_SECRET,
});
console.log('This is API ID',process.env.API_ID);

//Init app
const app = express()

//EJS
app.set("view engine", "ejs")

//Public Folder
app.use(express.static("./public"))
app.use('/', uploadRoute)


const PORT = process.env.PORT 

app.listen(PORT, ()=>{
    console.log(`Connected to Port ${PORT}`);
})
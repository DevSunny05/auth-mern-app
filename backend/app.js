const express=require("express");
const mongoose=require("mongoose")
const router=require('./routes/user-routes')
const cookieParser=require("cookie-parser")
const cors=require('cors')
// express giving its refrance to app variable and app variable holds functionality within application
const app=express();

// middleware
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(cookieParser());
app.use(express.json())
app.use('/api',router)


mongoose.connect("mongodb+srv://sarang:sarang@cluster0.be1cpsy.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(5000);
    console.log("database is connected")
}).catch((err)=>console.log(err))

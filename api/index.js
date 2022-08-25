const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/post');
const categoryRoute = require("./routes/category");
const multer = require('multer');
const path = require('path');

dotenv.config();

app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.Mongo_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('connected to database')).catch((err)=>console.log(err))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    },
})

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file uploaded");
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/post", postRoute)
app.use("/api/category", categoryRoute);

app.listen("5000", ()=>{
    console.log('server is running')
})
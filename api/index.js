const express = require("express");
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const helmet = require("helmet")
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const multer = require("multer");
const path = require("path")


//Connection
mongoose.connect('mongodb://localhost:27017/social', () => console.log("Connected"))

//Middlewares
app.use(bodyParser.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "public/images")
    },
    filename: (req, file, callBack) => {
        callBack(null, req.body.name);
    }

})
const upload = multer({storage})

//Routes usage
app.post('/api/upload',upload.single('file'),(req,res)=>{
    try {
        res.status(200).json("File uploaded successfully");
    } catch (err) {
        console.log(err);
    }
})

app.use("/images",express.static(path.join(__dirname,"public/images")))
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes)

app.listen(8800)
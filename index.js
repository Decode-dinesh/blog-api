const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/categories");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, () =>{
    console.log("connected db..")
});

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cd(null,"images");
    },filename:(req,file,cb) => {
        cb(null, "hello.jpeg");
    }
});

const upload = multer({storage:storage});
app.post("/api/upload,", upload.single("file"),(req,res) =>{
    res.status(200).json("file has been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categoy", categoryRoute);


app.listen(8800, ()=> {
    console.log("server started...");
})
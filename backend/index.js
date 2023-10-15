import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {PORT} from "./config.js";
// import { MONGO_URL } from "./config.js";

import rout from "./routs/rout.js";

const app = express();

// middle ware handing the CORS POLICY.
// this is the allow to defult ("  *  ")
app.use(cors())

// app.use(cors({
//     origin:"http://localhost:5555",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeandles:[],
// }));

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("BOOK APPLICATION USING MERN STOCK.")
})

app.use('/books',rout);


mongoose
    .connect('mongodb+srv://partagowda15:7COtoDpdf6MHOzOq@book.7tjqmb6.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log("data base connected")
        app.listen(PORT,()=>console.log(`server run with ${PORT}`))
    })
    .catch((error)=>{
        console.log(error);
    })
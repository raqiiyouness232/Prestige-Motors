import express from "express";
import dotenv from "dotenv";


const app = express();
 
const Port = 3000;                        //for start the project will run in this port 

app.listen(Port,()=>{console.log(`server is running on Port : ${PORT}`)});

app.use(express.json());                  //Middleware for reading json in req
dotenv.config();                          // .env file configration 

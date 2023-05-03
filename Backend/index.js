const express=require('express')
const {connection}=require("./config/mongo_DB")
const {userRouter}=require("./routes/userRouter")
const {classesRouter}=require("./routes/classesRouter")
const {ordersRouter}=require("./routes/ordersRouter")
const { dashboardRouter } = require("./routes/adminDashRouter");

const cors = require('cors')
require('dotenv').config()
const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Base Endpoint Of API")
})

app.use("/user",userRouter);
app.use("/class",classesRouter);
app.use("/order",ordersRouter);
app.use("/admin", dashboardRouter);


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to the db")
    } catch (error) {
        console.log(error)
    }
    console.log(`Listening on port ${process.env.port}`)
})

const dashboardRouter = require("express").Router();





dashboardRouter.get("/",(req,res)=>{
    res.status(200).send({message:"Admin Page"})
})








module.exports = { dashboardRouter };
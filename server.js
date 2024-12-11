const express = require("express");
const dbcon = require("./dbcon");
const menu = require("./models/menu");
require("dotenv").config();
//create an authentication 
const passport=require('./auth');

const app = express();
app.use(express.json());

//implement meddileware
 const logRequest=(req,res,next)=>{
   console.log(`[${new Date().toLocaleString()}]Request is made:${req.originalUrl}`);
   next();
 };
app.use(passport.initialize());
const localauthmiddleware=passport.authenticate('local',{session:false});

app.get("/", (req, res) => {
  res.send("Welcome back harsh shrivastava!!!");
});

//use passport.js


const port = process.env.PORT;

app.use(logRequest);
//import routes
const itemRoutes=require('./Routes/itemRoutes');

//use itemRoutes
app.use('/menu',itemRoutes)

//import routes
const customerRoutes=require('./Routes/customerRoutes');
//use customerRoutes
app.use('/customer',localauthmiddleware,customerRoutes);

app.listen(port, () => {
  console.log("Servre is started...");
});

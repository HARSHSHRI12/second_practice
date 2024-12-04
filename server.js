const express = require("express");
const dbcon = require("./dbcon");
const menu = require("./models/menu");
const customer=require('./models/customer');
require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome back harsh shrivastava!!!");
});


const port = process.env.PORT;

//import routes
const itemRoutes=require('./Routes/itemRoutes');

//use itemRoutes
app.use('/menu',itemRoutes)

//import routes
const customerRoutes=require('./Routes/customerRoutes');
//use customerRoutes
app.use('/customer',customerRoutes);

app.listen(port, () => {
  console.log("Servre is started...");
});

const mongoose=require('mongoose');
require('dotenv').config();
/*const mongo_url=process.env.MONGOURL;
const Gmongourl=process.env.Gmongourl;*/
const checkurl=process.env.GMONGOURL || process.env.MONGOURL;
mongoose.connect(checkurl);

const dbcon=mongoose.connection;

dbcon.on('connected',()=>{
    console.log('Database is connected...');
});
dbcon.on('disconnected',()=>{
    console.log('Database is Disconnected...');
});
dbcon.on('err',(err)=>{
    console.log(err);
});
 
module.exports=dbcon;
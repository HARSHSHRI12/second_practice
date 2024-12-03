const mongoose=require('mongoose');
const mongo_url='mongodb://localhost:27017/hotalDB';
mongoose.connect(mongo_url);

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
const mongoose=require('mongoose');
const menuschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        require:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const menu=mongoose.model('menu',menuschema);
module.exports=menu;
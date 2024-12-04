const mongoose=require('mongoose');
const monoSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    noOfOrder:{
        type:Number,
        require:true
    },
    paymentMode:{
        type:String,
        require:true
    },
    Date:{
        type:String,
        require:true
    }
});

//export schema
const customer=mongoose.model('customer',monoSchema);
module.exports=customer;
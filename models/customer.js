const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
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

//create pass hashing and salting

monoSchema.pre('save',async function(next){
    const person=this;
    //hash the pass only if it has modifyed (or not)
    if(!person.isModified('password')){
        return next();
    }
    try{
//hash pass genration 
const salt=await bcrypt.genSalt(10);

//hash password
const hashedpassword=await bcrypt.hash(person.password,salt);

//override the plain pass with the hashed one

person.password=hashedpassword;
   next();
    }
    catch(err){
   return next(err);
    }
});
monoSchema.methods.comparePassword =async function(candidatepassword){
    try{
const ismatch=await bcrypt.compare(candidatepassword,this.password);
return ismatch;
    }
    catch(err){
    throw err;
    }
}

//export schema
const customer=mongoose.model('customer',monoSchema);
module.exports=customer;
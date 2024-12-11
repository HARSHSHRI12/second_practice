//create authentication ....
const customer=require('./models/customer');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;


passport.use(new LocalStrategy(async(username,password,done)=>{
    try{
      //logic for authentication 
      //console.log('reciver crededial:',username ,password); (don't show in front of user)
      const user=await customer.findOne({username});
      if(!user){
        return done(null,false,{message:'username is incorrect...'});
      }
      const ispasswordMatch=await user.comparePassword(password);
      if(ispasswordMatch){
        return done(null,user);
      }
      else{
        return done(null,false,{message:'password is not matched...'})
      }
    }
    catch(err){
      return done(err);
  
    }
  }));

  //export
  module.exports=passport;
const express=require('express');
const router=express.Router();
const customer=require('../models/customer');

//creat post method for customer

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newCustomer=new customer(data);
        const response=await newCustomer.save();
        console.log('customer info is saved...');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error...'});
    }
});

//create get method for customer

router.get('/',async(req,res)=>{
    try{
    const response=await customer.find();
    console.log('customer data is find...');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal Server error...'});
    }
});

//create parametries cunstruter

router.get('/:name',async(req,res)=>{
    try{
    const name=req.params.name;
    if(['rahul','rounak','silpa','anshu','rakesh','pushpa','harsh'].includes(name)){
        const response=await customer.find({name:name});
        console.log('customer is Valid info...');
        res.status(200).json(response);
    }
    else{
        return res.status(404).json({error:'customer name is Invalid!!!'});
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error...'});
    }
});

//create put method for update customer info

router.put('/:id',async(req,res)=>{
    try{
     const customerdata=req.body;
     const customerid=req.params.id;
     const response=await customer.findByIdAndUpdate(customerid,customerdata,{
        new:true,
        RunValidator:true
     })
     if(!response){
        return res.status(404).json({error:'customer is Invalid!!!'});
     }
     console.log('customer is updated...');
     res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal Server error...'});
    }
});

//create delete method for delete customer

router.delete('/:id',async(req,res)=>{
    try{
      const customerid=req.params.id;
      const response=await customer.findByIdAndDelete(customerid);
      if(!response){
        return res.status(404).json({error:'Invalid info!!!'});
      }
      console.log('info is deleted...');
      res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal Server error...'});
    }
});

//export module
module.exports=router;
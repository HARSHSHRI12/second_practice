const express=require('express');
const router=express.Router();
const menu = require('../models/menu');

router.post('/',async(req,res)=>{
    try{
      const item=req.body;
      const newitem=new menu(item);
      const response=await newitem.save();
      console.log('item is saved in menu...');
      res.status(200).json(response);
    }
    catch(err){
console.log(err);
res.status(500).json({err:'Internal Server error...'});
    }
});

router.get('/',async(req,res)=>{
    try{
   const response=await menu.find();
   console.log('iteam is avalable in menu...');
   res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error...'});
    }
});

//create url parametries get method (endpoint)

router.get('/:name',async(req,res)=>{
    try{
  const name=req.params.name;
  if(['panner','cryspy-chicken','mix-veg'].includes(name)){
    const response=await menu.find({
        name:name
    });
    console.log('item is founded...');
    res.status(200).json(response);
  }
  else{
    res.status(404).json({error:'data is not found...'});
  }
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error...'});
    }
});

//create patch method for update

router.patch('/:id',async(req,res)=>{
    try{
        const itemdata=req.body;
        const itemid=req.params.id;
        const response=await menu.findByIdAndUpdate(itemid,itemdata,{
            new:true,
            runValidator:true
        });
        if(!response){
            return res.status(404).json('item is not find in this menu');
        }
        console.log('item is updated...');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error...'});
    }
});

//create delete method using delete

router.delete('/:id',async(req,res)=>{
    try{
  const itemid=req.params.id;
  const response=await menu.findByIdAndDelete(itemid);
  if(!response){
    return res.status(404).json('item is not avalable in this menu...');
  }
  console.log('item is Deleted...');
  res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error...'});
    }
});
module.exports=router;
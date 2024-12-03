const express=require('express');
const dbcon=require('./dbcon');
const menu=require('./menu');
const app=express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Welcome back harsh shrivastava!!!');
});

app.post('/menu',async(req,res)=>{
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

app.get('/menu',async(req,res)=>{
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

//create patch method for update

app.patch('/menu/:id',async(req,res)=>{
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

app.delete('/menu/:id',async(req,res)=>{
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
app.listen(3000,()=>{
    console.log('Servre is started...');
});
const express=require('express');
const Customer=require('../models/Customer');

const router=express.Router();

router.post('/newCustomer', (req, res)=>{
    const newCustomer= new Customer({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        city: req.body.city,
        dateofBirth: req.body.dateofBirth
    })
    newCustomer.save()
    .then((data)=>{
      res.json({message:'Data inserted succesfully'});
    })
    .catch(err=> res.json(err));
  })
  
  router.get('/allCustomer',(req, res)=>{
    Customer.find({}, {date:0, __v:0})
       .then(data=> res.json(data))
       .catch(err=> res.json(err))
  })
  
  router.post('/update/:id', function(req, res) {
    Customer.findByIdAndUpdate({_id:req.params.id}, req.body).then(data=>{
      res.json({message:'Data has updated Successfully'})
    }).catch((err)=>{
      console.log(err);
    })
  });
  
  router.delete('/delete/:id', (req, res)=>{
    Customer.findByIdAndRemove(req.params.id)
      .then(data=> res.json({message:'Data has deleted Successfully'}))
      .catch(err=> res.json(err));
  })
  
  
  module.exports=router;
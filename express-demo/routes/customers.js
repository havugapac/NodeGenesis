const { Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();




router.get('/', async (req, res) =>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
    });
    
    router.get('/:id', async (req, res) =>{
      const customer = await Customer.findById(req.params.id);    
      if(!customer) return res.status(404).send('the customer with the given ID was not found');
      res.send(customer);
    });
    
    
    //////post method
    
    router.post('/', async (req, res) => {
    
    // if(!req.body.name || req.body.name.length < 3)
    // {
    // res.status(400).send('name is required and should be minimum 3 characters');
    // return;
    // }
    
    const {error} = validate(req.body);
    
    if(error)
    {
    return res.status(400).send(error.details[0].message);
    
    };
    
      let customer= new Customer({ 
          name:req.body.name,
          phone:req.body.phone,
          isGold:req.body.isGold
    });
    
        customer = await customer.save();
        res.send(customer);
    
    });
    
    //PUT method
    
    router.put('/:id', async (req, res) =>{

    const {error} = validate(req.body);
    
    if(error)  return res.status(400).send(error.details[0].message);        
        
        
    const customer= await Customer.findByIdAndUpdate(req.params.id, {name:req.body.name}, {new:true});
    
    
    if(!customer) return res.status(404).send('customer not found please');  
    
    
    res.send(customer);
    });
    
    //DELETE method
    
    router.delete('/:id', async (req, res) =>{
        const customer= await Customer.findByIdAndRemove(req.params.id);
            
        if(!customer) return  res.status(404).send('customer not found please');
   
        res.send(customer);
    
    });
    


    module.exports = router;
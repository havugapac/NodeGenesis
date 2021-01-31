const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
    }));


router.get('/', async (req, res) =>{
    const courses = await Course.find().sort('name');
    res.send(courses);
    });
    
    router.get('/:id', async (req, res) =>{
      const course = await Course.findById(req.params.id);    
      if(!course) return res.status(404).send('the course with the given ID was not found');
      res.send(course);
    });
    
    
    //////post method
    
    router.post('/', async (req, res) => {
    
    // if(!req.body.name || req.body.name.length < 3)
    // {
    // res.status(400).send('name is required and should be minimum 3 characters');
    // return;
    // }
    
    const {error} = validateCourse(req.body);
    
    if(error)
    {
    return res.status(400).send(error.details[0].message);
    
    };
    
      let course= new Course({ name:req.body.name});
    
        course = await course.save();
        res.send(course);
    
    });
    
    //PUT method
    
    router.put('/:id', async (req, res) =>{

    const {error} = validateCourse(req.body);
    
    if(error)  return res.status(400).send(error.details[0].message);        
        
        
    const course= await Course.findByIdAndUpdate(req.params.id, {name:req.body.name}, {new:true});
    
    
    if(!course) return res.status(404).send('course not found please');  
    
    
    res.send(course);
    });
    
    //DELETE method
    
    router.delete('/:id', async (req, res) =>{
        const course= await Course.findByIdAndRemove(req.params.id);
            
        if(!course) return  res.status(404).send('course not found please');
   
        res.send(course);
    
    });
    
    function validateCourse(course) {
        const schema={
            name: Joi.string().min(3).required()
        };
        
       return Joi.validate(course, schema);
    }

    module.exports = router;
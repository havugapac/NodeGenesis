const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {validate, User} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//get the current user
router.get('/me', auth, async (req, res) => {
const user = await User.findById(req.user._id).select('-password');
res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});

    if(user) return res.status(400).send('User already exists');
     
    
    //without using lodash
    // user = new User({ 
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    
    // });

    //using lodash
    user = new User(_.pick(req.body,['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10); //first statement for hashing password
    user.password = await bcrypt.hash(user.password, salt);   //second statement for hashing password
        
    await user.save();

    
    
    //res.send(user) by using lodash but without token
    //res.send(_.pick(user, ['name', 'email'])); //using lodash

    //res.send(user) by using lodash and token
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email'])); //using lodash
});

module.exports = router;
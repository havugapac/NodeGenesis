const express = require('express');
const router = express.Router();
// app.get('/', (req, res) =>{
//     res.send('Hello world!!!!!!!!!!!!!!!!!');
// });

router.get('/', (req, res) =>{
    res.render('index', {title:'My express App', message:'Hello'});
});

module.exports = router;


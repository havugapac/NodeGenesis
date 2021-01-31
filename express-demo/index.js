const mongoose = require('mongoose');
const config = require('config');
const helmet = require('helmet');

const debug = require('debug') ('app:startup');

const morgan = require('morgan');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const customers = require('./routes/customers');

const express = require('express');
app = express();

mongoose.connect('mongodb://localhost/courses')
.then( () => console.log('Connected to mongo db....'))
.catch(err => console.error('Could not connect to mongo db...'));

app.set('view engine', 'pug'); //setting view engine



app.use(express.json()); //middleware function

app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/api/customers', customers);
app.use('/', home);

//configuration
console.log('Application name:' + config.get('name'));
console.log('Mail server:' + config.get('mail.host'));
//console.log('Mail password:' + config.get('mail.password'));

if(app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    
    debug('morgan enabled'); //console.log('morgan enabled');
}



app.use(logger); //middleware function

app.use( (req, res, next) =>{
    console.log('Authenticating......');
    next();
});


app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/post/:year/:month', (req, res) => {
    res.send(req.query);
});


const port = process.env.PORT || 3000;

app.listen(port, () =>console.log(`listening on port ${port}....`));
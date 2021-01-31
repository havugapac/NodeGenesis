// function sayHello(name)
// {
// console.log('hello' + name);
// }

// sayHello('Pac');

////////////////////////////////

// const logger = require('./logger.js');
// logger.log('message');

//////////////////////////////////////
// const os = require('os');
// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log(`total Memory: ${totalMemory}`);
// console.log(`free Memory: ${freeMemory}`);

//////////////////////////////////////////

// const fs = require('fs');

// const files = fs.readdirSync('./');

// console.log(files);

/////////////////////////////

// const fs = require('fs');

// fs.readdir('./', function(err,files){
//     if(err) console.log('Error:', err);
//     else console.log("Result:",files);
// });

// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// emitter.on('messageLogged', function(arg){
//     console.log('listener called',arg);

// });
// emitter.emit('messageLogged',{name:'pazzo', address:'rulindo'});

//////////////////////////////////////////////////////

const http = require('http');
const server = http.createServer((req,res)=>{
  if(req.url==='/'){
      res.write('Hello world');
      res.end();
  }  

  if(req.url==='/api/courses'){
      res.write(JSON.stringify([1, 2, 3]));
      res.end();
  }
});
server.listen(3000);

console.log('listening on port 3000');


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author : authorSchema

  // author : {
  //   type: authorSchema,
  //   required: true
  // } 

}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));


//update1
// async function updateAuthor(courseId) { 
//   const course = await Course.findById(courseId);
//   course.author.name = 'Mosh Hamedani';
//   course.save();
// }


//update2
// async function updateAuthor(courseId) { 
//   const course = await Course.update({_id: courseId},{
//     $set: {
//       'author.name': 'John smith'
//     }
//   });
// }

//remove subdocument
//update2
async function updateAuthor(courseId) { 
  const course = await Course.update({_id: courseId},{
    $unset: {
      'author': ''
    }
  });
}


// updateAuthor('600351d949b5ee0a58948ed4');





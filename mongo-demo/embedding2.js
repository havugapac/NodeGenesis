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
  authors : [authorSchema]

  // author : {
  //   type: authorSchema,
  //   required: true
  // } 

}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
    
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'Stiko' })]);


//create course with multiple authors /using an array of multiple documents


//add new author to an existing course

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save()
  }
  
//addAuthor('60073366e82a290efcc483ad', new Author({name: 'Pazzo'}));

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

removeAuthor('60073366e82a290efcc483ad', '600734735a6f5c154860ca8e')



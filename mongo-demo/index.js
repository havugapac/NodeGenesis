const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to mongoDB ....'))
.catch(err => console.error('Could not connect to mongoDB...', err));

const courseSchema= mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type : Date, default: Date.now},
    isPublished: Boolean
});

//object creation
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){

const course = new Course({
    name: 'Angular course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
});

const result = await course.save();
console.log(result);

}

//createCourse();

async function getCourses(){
    
//comparison operators
    //eq(equal)
    //ne( not equal)
    //gt(greater than)
    //gte(greater than or equal)
    //lt(less than)
    //lte(less than or equal)
    //in
    //nin(not in)

//logical operators
    //or
    //and

    const courses= await Course
    //.find() //select all  

    //.find({price: {$gte:10, $lte:20}}) //greater than or equal to 10 and less than or equal to 20 (between 10 and 20)
    //.find({price :{$in :[10, 15, 20]}}) //where is 10 or 15 or 20

    //.or([{author: 'Mosh'}, {isPublished: true}])
    //.and([{author: 'Mosh'}, {isPublished: true}])

    //regular expressions/ starts with Mosh
    .find({author: /^Mosh/})

    //regular expressions/ ends with Mosh
    .find({author: /Mosh$/i})

    //regular expressions/ contains Mosh
    .find({author: /.*Mosh.*/i})

    .find({author: 'Mosh', isPublished: true})
    .limit(10)
    .sort({name:1})
    //descesnding .sort({name:-1})
    .select({name: 1, tags: 1})
    .count();

    console.log(courses);
}

//getCourses();


//query first update
async function updateCourse(id){
const course = await Course.findById(id);

if(!course) return;

course.isPublished= true;
course.author= 'Another author';

const result = await course.save();
console.log(course);
}
//updateCourse('60020225b091e504cc5b54e6');



//updatedirectly
async function updateCourse2(id){
    const course = await Course.update({_id: id}, {
        $set: {
            author: 'Mosh',
            isPublished: true
        }
    });
    
    console.log(course);
    }
    //updateCourse2('60020225b091e504cc5b54e6');

    //update and get updated document
async function updateCourse3(id){
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Pac',
            isPublished: false
        }
    }, {new :true});
    
    console.log(course);
    }
    //updateCourse3('60020225b091e504cc5b54e6');


    //remove document
    async function removeCourse(id){
    const result = await Course.deleteOne({_id:id});
    //const result = await Course.deleteMany({_id:id});
    console.log(result);
    }
    //removeCourse('60020225b091e504cc5b54e6');

    //get the document and delete it
    async function removeCourse2(id){
        const course = await Course.findByIdAndRemove(id);
        //const result = await Course.deleteMany({_id:id});
        console.log(course);
        }
        removeCourse2('60020225b091e504cc5b54e6');

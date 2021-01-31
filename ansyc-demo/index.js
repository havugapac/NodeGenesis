console.log('Before');
setTimeout( () =>{
console.log('Holla hola holla');
},2000);
console.log('After');

// getUser(1, (user) =>{
// getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) =>{
//         console.log(commits);
//     })
// })
// });

// const p = getUser(1);
// p.then(user => console.log(user));


// //promise based approach
// getUser(1)
// .then(user => getRepositories(user.gitHubUsername))
// .then(repos => getCommits(repos[0]))
// .then(commits => console.log('Commits', commits))
// .catch(err => console.log('Error', err.message));

//Async and Await approach
async function displayCommits(){
try{
const user = await getUser(1);
const repos = await getRepositories(user.gitHubUsername);
const commits = await getCommits(repos[0]);
console.log(commits); 
}
catch(err){
console.log('Error', err.message);
}
}

displayCommits();

function getUser(id){

    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
                console.log('Reading a user from the database');
                resolve({id:id, gitHubUsername:'Mosh'});
            },2000);
    });
}

function getRepositories(username){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
     console.log('Calling gitHub API.....');
     //resolve(['repo1', 'repo2', 'repo3']);
     reject(new Error('Could not get the repos G....'));
        },2000);
    });
}

function getCommits(repo){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
     console.log('Calling gitHub API.....');
     resolve(['Commit']);
        },2000);
    });
}
/* const p = new Promise((resolve, reject) => {
    setTimeout(()=>{
        // resolve(1);
        reject(new Error('message'));
    },2000);
})

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message)); */


console.log("Before");

//Promise-based approach
/* getUser(1)
    .then(user => getRepos(user.gitHubName))
    .then(repos => getCommits(repos))
    .then(commits => console.log(commits))
    .catch(err => console.log('Error', err.message));

 */
//Async and await approach
async function displayCommits(){
    try
    {
        const user = await getUser(1);
        const repos = await getRepos(user.gitHubName);
        const commits = await getCommits(repos[0]);
        console.log(commits);   
    }
    catch (err) {
        console.log('Error: ', err.message);
    }
} 

displayCommits();


console.log("After");
function displayUser(user){
    console.log(user);
    getRepo(user.gitHubName, displayRepo);
}

function displayRepo(repos){
    console.log('Repo', repos);
    getCommit(repo, displayCommit);
}

function displayCommit(commits){
    console.log(commits);
}

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log("reading a user from a database");
            resolve({id: id, gitHubName: 'Ny'});
        }, 2000);
    });
}

function getRepos(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API....");
        // resolve(['repo1', 'repo2', 'repo3']);
        reject(new Error('Could not found a repo.'));
        }, 2000);
    });
    
};

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API....");
        resolve(['commit']);
        }, 2000);
    })
   
}
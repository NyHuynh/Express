console.log("Before");
getUser(1, displayUser);

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

function getUser(id, callback){
    setTimeout(()=>{
        console.log("reading a user from a database");
        callback({id: id, gitHubName: 'Ny'});
    }, 2000);
    
}

function getRepos(username, callback){
    setTimeout(() => {
        console.log("Calling GitHub API....");
    callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
};

function getCommits(repo, callback){
    setTimeout(() => {
        console.log("Calling GitHub API....");
    callback(['commit']);
    }, 2000);
}
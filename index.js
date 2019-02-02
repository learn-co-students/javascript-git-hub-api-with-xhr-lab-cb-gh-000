

function getRepositories() {
    var username = document.getElementById("username").value;
    const  req = new XMLHttpRequest();
    req.addEventListener("load", displayRepositories)
    req.open("GET", "https://api.github.com/users/" + username + "/repos")
    req.send()
}

function displayRepositories() {
    var repos = JSON.parse(this.responseText)
    console.log(repos)
    const repoList = "<ul>" + repos.map(repo => {
        const dataUsername = 'data-username="' + repo.owner.login + '"'
        const dataRepoName = 'data-repository="' + repo.name + '"'
        return (`
                <li>
                    <h2>${repo.name}</h2>
                    <a href="${repo.html_url}">${repo.html_url}</a><br>
                    <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
                    <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
                </li>`
            )

    }).join("") + "</ul>"
    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
    const repoName = el.dataset.repository
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits)
    req.open("GET", "https://api.github.com/repos/"+ el.dataset.username+ "/" + repoName + "/commits")
    req.send()
}

function displayCommits(){
    var commits = JSON.parse(this.responseText)
    console.log(commits)
    const commitsList = `<ul>${commits.map(
        commit => '<li><h3>' + commit.commit.author.name +
        ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>')
        .join("")}</ul>`
    document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
    const repoName = el.dataset.repository
    console.log(name)
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayBranches)
    req.open("GET", "https://api.github.com/repos/" + el.dataset.username + "/" + repoName + "/branches")
    req.send()
}

function displayBranches() {
    var branches = JSON.parse(this.responseText)
    console.log(branches)
    const branchesList = `<ul>${branches.map(
        branch =>
            "<li>" +
            branch.name +
            "</li>"
    ).join("")}</ul>`
    document.getElementById("details").innerHTML = branchesList
}

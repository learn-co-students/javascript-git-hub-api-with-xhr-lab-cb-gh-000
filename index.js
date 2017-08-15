function getRepositories() {
  const req = new XMLHttpRequest()
  var url = "https://api.github.com/users/" + document.getElementById("username").value +"/repos"
  req.addEventListener("load", displayRepositories);
  req.open("GET",url)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(
      `<li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
      </li>`
    )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const Username = el.dataset.username;
  const Reponame = el.dataset.repository;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + Username +'/' + Reponame + '/commits')
  req.send()
}

function getBranches(el) {
  const Username = el.dataset.username;
  const Reponame = el.dataset.repository;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + Username +'/' + Reponame + '/branches')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>'
  + commit.author.login + commit.commit.author.name + '</strong> - ' + commit.commit.message
  + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>'
  + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

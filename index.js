function getRepositories() {
  event.preventDefault();
  var username = document.getElementById('username').value;
  var link = "https://api.github.com/users/" + username + "/repos";
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", link);
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText);
  repoList = "<ul>" + repos.map(repo => "<li>" + "<strong>" + repo.name + "</strong>" + "<br>" + `<a href="${repo.html_url}">Visit the Repo</a>` + `<br><a href="#" data-repo="${repo.name}" onclick="getCommits(this)">See commits</a>` + `<br><a href="#" data-repo="${repo.name}" onclick="getBranches(this)">See branches</a>` + "</li>" ).join("") + "</ul>";
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const link = "https://api.github.com/repos/octocat/" + name + "/commits";
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", link);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = "<ul>" + commits.map(commit => "<li>author name: " + commit.commit.author.name + " - " + "author login: " + commit.author.login + " - " + "message: " + commit.commit.message + "</li>").join("") + "</ul>";
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repo;
  const link = "https://api.github.com/repos/octocat/" + name + "/branches";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", link);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = "<ul>" + branches.map(branch => "<li>" + "Name: " + branch.name +  "</li>").join("") + "</ul>";
  document.getElementById('details').innerHTML = branchesList;
}

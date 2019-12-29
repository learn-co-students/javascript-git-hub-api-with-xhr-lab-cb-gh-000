function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(r => `<li><a href="${r.html_url}" target="_blank">${r.name}</a> - <a href="#" data-user="${r.owner.login}" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-user="${r.owner.login}" data-repo="${r.name}" onclick="getBranches(this)">Get Branches</a></li>`)
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function showCommits() {
  var commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
    .map(c => `<li><strong>${c.commit.author.name}</strong> - ${c.commit.message}</li>`)
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;

}

function showBranches() {
  var branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches
    .map(b => `<li><strong>${b.name}</strong></li>`)
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = branchesList;

}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/"+document.getElementById('username').value+"/repos");
  req.send();
}

function getCommits(el) {
  const reponame = el.dataset.repo;
  const username = el.dataset.user;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + reponame + "/commits");
  req.send();
}

function getBranches(el) {
  const reponame = el.dataset.repo;
  const username = el.dataset.user;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showBranches);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + reponame + "/branches");
  req.send();
}

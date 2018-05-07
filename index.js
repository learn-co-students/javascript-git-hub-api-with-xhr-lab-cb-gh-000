function getRepositories() {
  event.preventDefault();
  var username = document.getElementById('username').value;
  var link = "https://api.github.com/users/" + username + "/repos";
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", link);
  req.send();
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  repoList = "<ul>" + repos.map(repo => "<li>" + "<strong>" + repo.name + "</strong>" + "<br>" + `<a href="${repo.html_url}">Visit the Repo</a>` + `<br><a href="#" data-repo="${repo.name}" onclick="getCommits()">See commits</a>` + "</li>" ).join("") + "</ul>";
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const req = new XMLHttpRequest()
  const name = el.dataset.repo;
  const link = 'https://api.github.com/repos/octocat/' + name + "/commits";
  req.addEventListener("load", displayCommits);
  req.open("GET", link);
  req.send;
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText);
  const commitsList = "<ul>" + commits.map(commit => `<li>author name: ${commit.author.name} - author login: ${commit.author.login} - message: ${commit.message}</li>`).join("") + "</ul>";
  document.getElementById('details').innerHTML = commitsList;
}

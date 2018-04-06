function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  /* console.log(this.responseText);
  let repoList = "<ul>";
  for(var i=0; i < this.responseText.length; i++) {
    repoList += '<li>' + this.responseText[i]['name'] + '</li>'
  }
   repoList += '</ul>'; */
  document.getElementById('repositories').innerHTML = repoList; // list of repos
}

var userName;

function getUserName() {
userName = document.getElementById('userInput').value;
}




function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/' + userName +'/repos');
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/' + userName +'/' + name + '/commits');
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}

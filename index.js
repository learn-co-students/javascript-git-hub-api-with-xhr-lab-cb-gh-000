const element = document.querySelector('form');
element.addEventListener('submit', event => {
  event.preventDefault();
  // actual logic, e.g. validate the form
  console.log('Form submission cancelled.');
});
function getRepositories() {
  var username = document.getElementById('username').value;
  console.log(username);
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/"+username+"/repos");
  req.send();
}
function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a>'+
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}
function getCommits(el) {
  var reponame = el.dataset.repo;
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load",displayCommits);
  req.open("GET","https://api.github.com/repos/"+username+"/"+reponame+"/commits");
  req.send();
}
function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        "<li><strong>" +
        commit.commit.author.name +
        "</strong> - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}
function getBranches(el) {
  // /repos/:owner/:repo/branches
  const username = document.getElementById("username").value;
  const reponame = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load",displayBranches);
  req.open("GET","https://api.github.com/repos/"+username+"/"+reponame+"/branches");
  req.send();
}
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchlist = `<ul>${branches.map(branch => "<li>"+branch.name+"</li>").join("")}</ul>`;
  document.getElementById("details").innerHTML = branchlist;
}

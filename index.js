//Create a form with a username field that calls a getRepositories function that loads the repositories div with a list of public repositories for that user. The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).
function getRepositories(){
  let user = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${user}/repos`);
  req.send();
}
function displayRepositories(event, data){
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  let repoList = "";
  for(let r of repos){
    repoList += `<li><a href="${r.html_url}" target="_blank">${r.name}</a> - <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Commits</a> - <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Branches</a></li>`;
  }
  //$('#repositories').html(`<ul>${repoList}</ul>`);
  document.getElementById('repositories').innerHTML = `<ul>${repoList}</ul>`;
}
//Add a link to each repository that calls a getCommits function on click and, when the request is complete, calls a displayCommits function that fills the details div with a list of commits for that repository. The display of commits should include the author's Github name, the author's full name, and the commit message. Give the link data attributes of username and repository to be used by the getCommits function.
function getCommits(el){
  const user = el.dataset.username;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${user}/${name}/commits`);
  req.send();
}
function displayCommits(){
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  let commitsList = "";
  for(let i of commits) {
    commitsList += `<li><strong>${i.author.login} (${i.commit.author.name})</strong> - ${i.commit.message}</li>`;
  }
  //$('#details').html(`<ul>${commitsList}</ul>`);
  document.getElementById('details').innerHTML = `<ul>${commitsList}</ul>`;
}
//Add a link to each repository that calls a getBranches function when clicked and, when complete, calls a displayBranches function that fills the details div with a list of names of each branch of the repository. Give the link data attributes of username and repository for use by the getBranches function.
function getBranches(el){
  const repo = el.dataset.repository;
  const owner = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET",`https://api.github.com/repos/${owner}/${repo}/branches`);
  req.send();
}
function displayBranches(){
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  let branchesList = "";
  for(let b of branches){
    branchesList += `<li>${b.name}</li>`;
  }
  //$('#details').html(`<ul>${branchesList}</ul>`);
  document.getElementById('details').innerHTML = `<ul>${branchesList}</ul>`;
}

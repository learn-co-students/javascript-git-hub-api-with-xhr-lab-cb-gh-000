
function getRepositories(){
  var username = document.getElementById("username").value;
  const request = new XMLHttpRequest();
  request.addEventListener("load", displayRepositories);
  request.open("GET", `https://api.github.com/users/${username}/repos`);
  request.send();
}

function displayRepositories(event ,data){
  var repos =JSON.parse(this.responseText);
  var list = "<ul>";
  for (let repo of repos) {
    list += `<li><a href="${repo.html_url}">${repo.name}</a> <a href="${repo.html_url}" data.username="${repo.owner.login}" data-repository ="${repo.name}" onclick="getCommits(this)">GET COMMITS</a>
    <a href="${repo.html_url}" data.username="${repo.owner.login}" data-repository ="${repo.name}" onclick="getBranches(this)">GET BRANCHES</a></li>`;
  }
  list += "</ul>";
  document.getElementById("repositories").innerHTML = list;
}

function getCommits(el){
  const repo = el.dataset.repository;
  const user = el.dataset.username;
  const request = new XMLHttpRequest();
  request.addEventListener("load",displayCommits);
  request.open("GET", `https://api.github.com/repos/${user}/${repo}/commits`);
  request.send();

}
function displayCommits(){
  var commits = JSON.parse(this.responseText)
  var list = "<ul>";
  for (let com of commits){
    list += `<li>${com.author.login} (${com.commit.author.name}) <p>${com.commit.message}</p></li>`;
  }
  list += "</ul>";
  document.getElementById("details").innerHTML=list;

}

function getBranches(el){
  const repo = el.dataset.repository;
  const user_name = el.dataset.username;
  const request = new XMLHttpRequest();
  request.addEventListener("load",displayBranches);
  request.open("GET",`https://api.github.com/repos/${user_name}/${repo}/branches`);
  request.send();
}
function displayBranches(){
  var branches = JSON.parse(this.responseText)
  var listBranch = "<ul>";
  for (let branch of branches){
    listBranch += `<li>Branch Name: ${branch.name}</li>`;
  }
  listBranch += "</ul>";
  document.getElementById("details").innerHTML=listBranch;

}

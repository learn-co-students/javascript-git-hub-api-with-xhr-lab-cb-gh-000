
function getRepositories() {
var userName = document.getElementById('username').value;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayRepositories);
	req.open("GET", `https://api.github.com/users/${userName}/repos`);
	req.send();
}

function displayRepositories(event, data) {
	var repos = JSON.parse(this.responseText);
	console.log(repos);
	const repoList = repos.map(r => {
		let repoItem = '<li>';
		repoItem += '<a href="' + r.html_url + '" target="_blank">' + r.name + ' </a> ';
		repoItem += '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> ';
		repoItem += '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a>';
		repoItem += '</li>';
		return repoItem;
	});
	
	const repoListDisplay = `<ul>${repoList.join('')}</ul>`;
														
	document.getElementById('repositories').innerHTML = repoListDisplay;
}

function getCommits(el) {
  const name = el.dataset.repository;
	const login = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${login}/${name}/commits`);
  req.send();
}

function getBranches(el) {
  const name = el.dataset.repository;
	const login = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${login}/${name}/branches`);
  req.send();
}



function displayCommits() {
	const commits = JSON.parse(this.responseText);
	console.log(commits);
	
	const commitList = commits.map(c => {
		let commitItem = '<li>';
		commitItem += `Author name: ${c.author = (c.author == null ? 'Cannot display login' : c.author.login)} (${c.commit.author.name = (c.commit.author.name == undefined ? 'Cannot display full name' : c.commit.author.name)}),`;
		commitItem += "\n";
		commitItem += `Commit message: ${c.commit.message}`;
		commitItem += '</li>';
		return commitItem;
	});
	
	const commitListDisplay = `<ul>${commitList.join('')}</ul>`;
	document.getElementById('details').innerHTML = commitListDisplay;
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	console.log(branches);
	
	const branchList = branches.map(b => `<li>${b.name}</li>`);
	
	const branchItemsDisplay = `<ul>${branchList.join('')}</ul>`;
	document.getElementById('details').innerHTML = branchItemsDisplay;
}





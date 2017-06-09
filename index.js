function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);

  const repoListItems = repos.map((r) => {
    let repoListItem = '<li>';
    repoListItem += `<a href="${r.html_url}">${r.name}</a>`;
    repoListItem += ' - ';
    repoListItem += `<a href="#" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a>`;
    repoListItem += ' - ';
    repoListItem += `<a href="#" data-repo="${r.name}" onclick="getBranches(this)">Get Branches</a>`;
    repoListItem += '</li>';
    return repoListItem;
  });

  const repoListHTML = `<ul>${repoListItems.join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoListHTML;
}

function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('get', `https://api.github.com/users/${username}/repos`);
  req.send();
}

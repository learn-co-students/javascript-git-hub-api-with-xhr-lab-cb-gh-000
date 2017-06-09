function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('get', `https://api.github.com/users/${username}/repos`);
  req.send();
}

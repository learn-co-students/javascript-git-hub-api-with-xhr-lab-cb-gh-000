const rootURL = "https://api.github.com"

function getRepositories() {
  const repos = new XMLHttpRequest()
  const owner = document.getElementById('username').value
  repos.addEventListener('load', displayRepositories)
  repos.open('get', `${rootURL}/users/${owner}/repos`)
  repos.send()
}

function getCommits(el) {
  const commits = new XMLHttpRequest()
  const url = `${rootURL}/repos/${el.dataset.username}/${el.dataset.repository}/commits`
  commits.addEventListener('load', displayCommits)
  commits.open('get', url)
  commits.send()
}

function getBranches(el) {
  const bran = new XMLHttpRequest()
  const url = `${rootURL}/repos/${el.dataset.username}/${el.dataset.repository}/branches`
  bran.addEventListener('load', displayBranches)
  bran.open('GET', url)
  bran.send()
}

function displayCommits() {
  const resp = JSON.parse(this.responseText)
  console.log(resp)
  const commitList = "<ul>" + resp.map(c => {
      return (
          "<li>" +
              "<h3>" + c.commit.author.name + "</h3>" +
              "<small>" + c.author.login + "</small>" +
              "<p>" + c.commit.message + "</p>" +
          "</li>"
     )
  }).join('') + "</ul>"
  document.getElementById("details").innerHTML = commitList
}


//     describe('displayBranches', () => {
//       it('parses and displays json values', () => {
//         var resp = { responseText: branchesData() }
//         displayBranches.call(resp)
//         el = document.getElementById("details")
//         expect(el.innerHTML).toMatch(/master/)
//       })
//     })
function displayBranches() {
  const bran = JSON.parse(this.responseText)
  const branList = "<ul>" + bran.map(b => "<li>"+ b.name +"</li>").join('') + "</ul>"
  document.getElementById('details').innerHTML = branList
  console.log(bran)
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const reposList =  "<ul>" + repos.map(r => {
    const sername = r.owner.login
    const dataUsername = 'data-username="' + r.owner.login + '"'
    const dataRepoName = 'data-repository="' + r.name + '"'
    return (`
      <li>
          <h3>${sername}</h3>
          <a ${dataUsername} ${dataRepoName} href='#' onclick='getCommits(this) ' >Show commits</a>
          <a ${dataUsername} ${dataRepoName} href='#' onclick='getBranches(this) ' >Show branch</a>
          <a href='${r.html_url}'>Go to ${r.name}</a>
      </li>`
    )
    }).join("") + '</ul>'
document.getElementById('repositories').innerHTML = reposList
}

import axios from 'axios'

const github = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_URL,
  headers: { Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` },
})

//Pretraga korisnika na input
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const res = await github.get(`/search/users?${params}`)
  return res.data.items
}

//Profil  i repozitoriji korisnika
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ])

  return { user: user.data, repos: repos.data }
}

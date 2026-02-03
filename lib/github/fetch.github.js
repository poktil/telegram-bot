const { GITHUB_API_URL } = require('../../constants/github.constants')

async function fetchFromGitHub(path) {
  const url = `${GITHUB_API_URL}/${path}`

  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
        Authorization: `Bearer ${process.env.GITHUB_INSULTS_TOKEN}`,
      },
    })

    if (!res.ok) throw new Error('GitHub fetch failed')
    const data = await res.json()
    return data
  } catch (err) {
    console.error('GitHub fetch failed:', err, url)
    return null
  }
}

module.exports = { fetchFromGitHub }

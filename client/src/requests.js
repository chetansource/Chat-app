const globalUrl = 'http://localhost:3001'

//signUp
export async function userSignup(name, passwd, repwd) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: name,
        password: passwd,
        confirmpwd: repwd,
      }),
    }
    const url = globalUrl + '/users/signup'
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`http error status:${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

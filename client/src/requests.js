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
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

// login
export async function loginUser(name, passwd) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userName: name,
        password: passwd,
      }),
    }
    const url = globalUrl + '/users/login'
    const response = await fetch(url, config)
    const status = response.status
    if (status === 200) {
      return [response.status, await response.json()]
    } else {
      return await response.json()
    }
  } catch (error) {
    console.log(error)
  }
}

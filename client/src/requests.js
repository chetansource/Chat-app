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

export async function getUserName(userId) {
  try {
    const url = globalUrl + `/users/${userId}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getFriendsList(userId) {
  try {
    const url = globalUrl + `/users/contacts/${userId}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getMessages(userId, receiverId) {
  try {
    const url = globalUrl + `/messages/${userId},${receiverId}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function addFrdtoContacts(userId, frdName) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userName: frdName,
      }),
    }
    const url = globalUrl + `/users/${userId}`
    const response = await fetch(url, config)
    const status = response.status
    if (status === 400) {
      return await response.json()
    }
    return status
  } catch (error) {
    console.log(error)
  }
}

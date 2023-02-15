const globalUrl = 'http://localhost:3001'

//signUp
export async function userSignup() {
  try {
    const url = globalUrl + '/users/signup'
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`http error status:${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

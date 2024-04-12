import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../requests.js'

function LoginPage() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function LoginUser() {
    if (userName.trim().length === 0)
      return [setErrorMessage('please enter username and password')]
    if (password.trim().length < 6) {
      return [
        setErrorMessage('password needs atleast 6 characters'),
        setPassword(''),
      ]
    }
    setPassword('')

    const loginData = await loginUser(userName, password)
    if (loginData[0] === 200) {
      navigate('/chatpage')
    }
    userErrors(loginData)
  }

  function userErrors(data) {
    if (data.message === 'user doesnt exist') {
      setErrorMessage('please enter correct user name')
    } else if (data.message === 'Invalid Credentials') {
      setErrorMessage('Incorrect password')
    }
  }
  function signupRoute() {
    navigate('/signup')
  }

  return (
    <div className="flex items-center h-screen">
      <form
        className="mx-auto max-w-[350px] space-y-6 border-2 border-black px-6
  py-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2 text-center ">
          <h1 className="text-3xl font-bold">Welcome Back </h1>
          <p className="text-black ">
            Enter your credentials to login
          </p>
        </div>
        <div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-black"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="block w-full border-2 border-black rounded-md
        shadow-sm p-2"
                id="username"
                placeholder="Enter your username"
                required
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-black"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="block w-full border-2 border-black rounded-md shadow-sm p-2"
                id="password"
                placeholder="Enter your password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="w-full btn btn-primary  flex justify-center pt-1"
                type="submit"
                onClick={LoginUser}
              >
                Login
              </button>
            </div>
            <p className="loginError">{errorMessage}</p>
            <div className="mt-4 text-center text-sm">
              Already Don't an account?
              <button
                onClick={signupRoute}
                className="px-2 text-green-600 underline"
              >
                Signup
              </button>
              in instead.
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage



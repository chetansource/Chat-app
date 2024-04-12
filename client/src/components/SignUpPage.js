import React, { useState } from 'react'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import { userSignup } from '../requests.js'

function SignUpPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [passWord, setPassWord] = useState('')
  const [confirmPassword, setConfirmpassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  async function registerUser() {
    if (username.trim().length === 0)
      return [setErrorMessage('please enter username')]
    setUsername('')
    if (passWord.trim().length < 6) {
      return [
        setErrorMessage('password needs atleast 6 characters'),
        setPassWord(''),
      ]
    }
    setPassWord('')
    if (confirmPassword.trim().length < 6) {
      return [
        setErrorMessage('password needs atleast 6 characters'),
        setConfirmpassword(''),
      ]
    }
    setConfirmpassword('')
    const data = await userSignup(
      username.trim(),
      passWord.trim(),
      confirmPassword.trim()
    )
    if (data.message === 'username already exist') {
      setErrorMessage('choose different user name')
    } else if (data.message === 'Invalid Credentials') {
      setErrorMessage('password doesnt match')
    } else {
      navigate('/')
    }
  }

  function changeRoute() {
    navigate('/')
  }

  return (
    <div className="flex items-center h-screen">
      <form
        className="mx-auto max-w-[350px] space-y-6 border-2 border-black px-6 py-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2 text-center ">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-black ">
            Enter your information to create an account
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
                className="block w-full border-2 border-black rounded-md shadow-sm p-2"
                id="username"
                placeholder="Enter your username"
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-black"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                className="block w-full border-2 border-black rounded-md shadow-sm p-2"
                id="confirm-password"
                placeholder="Enter your password again"
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="w-full btn btn-primary  flex justify-center pt-1"
                type="submit"
                onClick={registerUser}
              >
                Create Account
              </button>
            </div>
            <p className="loginError">{errorMessage}</p>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <button
                onClick={changeRoute}
                className="px-2 text-green-600 underline"
              >
                Login
              </button>
              in instead.
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage

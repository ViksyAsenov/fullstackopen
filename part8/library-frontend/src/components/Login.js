import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../utils/queries'

const Login = ({ show, setUser, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    },
    onCompleted: () => {
      setPage('books')
    },
  })

  useEffect(() => {
    if (result.data) {
      const user = result.data.login.value
      setUser(user)
      localStorage.setItem('libraryUser', user)
    }
  }, [result.data, setUser])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default Login

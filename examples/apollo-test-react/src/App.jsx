/* eslint-disable react/prop-types */
import { useApolloClient, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'
import { ALL_PERSONS } from './utils/queries'
import { useState } from 'react'

function App() {
  const [errorMessage, setErrorMesage] = useState(null)
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  if(result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMesage(message)
    setTimeout(() => {
      setErrorMesage(null)
    }, 5000)
  }

  const Notify = ({errorMessage}) => {
    if ( !errorMessage ) {
      return null
    }

    return (
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    )
  }

  if(!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App

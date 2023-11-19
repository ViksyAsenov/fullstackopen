/* eslint-disable react/prop-types */
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'
import { ALL_PERSONS, PERSON_ADDED } from './utils/queries'
import { useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}

const App = () => {
  const [errorMessage, setErrorMesage] = useState(null)
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({ data}) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} was added`)
      updateCache(client.cache, { query: ALL_PERSONS}, addedPerson)
    }
  })

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

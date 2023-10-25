/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS } from './utils/queries'
import { useState } from 'react'

function App() {
  const [errorMessage, setErrorMesage] = useState(null)
  const result = useQuery(ALL_PERSONS)

  if(result.loading) {
    return <div>loading...</div>
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

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App

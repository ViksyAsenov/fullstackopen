import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/Form'
import Content from './components/Content'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const defaultNotification = {message: '', positive: false}
  const [notification, setNotification] = useState(defaultNotification)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const personExist = persons.find(person => person.name === newPerson.name)
    if(personExist !== undefined) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(personExist.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personExist.id ? person : returnedPerson))

            const newNotification = {
              ...notification, 
              message: `${newPerson.name}'s phone has been updated to ${newPerson.number}`, 
              positive: true
            }
            setNotification(newNotification)
  
            setTimeout(() => {
              setNotification({...defaultNotification})
            }, 3000)
          })
          .catch(error => {
            const newNotification = {
              ...notification, 
              message: `Information of ${newPerson.name} has already been removed from server`, 
              positive: false
            }
            setNotification(newNotification)
            
            setTimeout(() => {
              setNotification({...defaultNotification})
            }, 3000)

            setPersons(persons.filter(person => person.id !== personExist.id))
          })
      }

      return
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

    const newNotification = {
      ...notification, 
      message: `Added ${newPerson.name}`, 
      positive: true
    }
    setNotification(newNotification)
    
    setTimeout(() => {
      setNotification({...defaultNotification})
    }, 3000)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personsService
        .remove(personToDelete.id)
        .catch(e => {
          const newNotification = {
            ...notification, 
            message: `${personToDelete.name} has already been removed from the server`, 
            positive: false
          }
          setNotification(newNotification)
          
          setTimeout(() => {
            setNotification({...defaultNotification})
          }, 3000)
        })

      setPersons(persons.filter(person => person.id !== personToDelete.id))
    }
  }

  const personsToShow = filter === '' 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} positive={notification.positive}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      
      <PersonForm 
        handleSubmit={handleSubmit} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <Content persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
import { React, useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Error'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedNoteAppUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedNoteAppUserJSON) {
      const user = JSON.parse(loggedNoteAppUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const createNote = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject)
      setNotes(notes.concat(returnedNote))
    } catch (excepetion) {
      setErrorMessage(`${excepetion.response.data.error}`)

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const toggleImportanceOf = async (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    try {
      const returnedNote = await noteService.update(id, changedNote)
      if (returnedNote) {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      } else {
        setNotes(notes.filter(note => note.id !== id))
        throw new Error('Note doesn\'t exist')
      }
    } catch (excepetion) {
      excepetion.response.data.error !== undefined
        ? setErrorMessage(`${excepetion.response.data.error}`)
        : setErrorMessage(`${excepetion.message}`)

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const deleteNote = async (id) => {
    try {
      await noteService.remove(id)
      setNotes(notes.filter(note => note.id !== id))
    } catch (excepetion) {
      excepetion.response.data.error !== undefined
        ? setErrorMessage(`${excepetion.response.data.error}`)
        : setErrorMessage(`${excepetion.message}`)

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      setUser(user)
      noteService.setToken(user.token)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
    } catch (excepetion) {
      setErrorMessage(`${excepetion.response.data.error}`)

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    noteService.setToken(null)
    setUser(null)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {!user && <Togglable buttonLabel='log in'>
        <LoginForm
          handleLogin={handleLogin}
        />
      </Togglable>}

      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

        <Togglable buttonLabel='new note'>
          <NoteForm
            createNote={createNote}
            setErrorMessage={setErrorMessage}
          />
        </Togglable>
      </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App

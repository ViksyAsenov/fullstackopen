import { React, useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Error'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  if (!notes) {
    return null
  }

  const addNote = async (event) => {
    event.preventDefault()

    if (newNote === '') {
      setErrorMessage('Note must not be null')

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)

      return
    }

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    try {
      const returnedNote = await noteService.create(noteObject)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    } catch (excepetion) {
      setErrorMessage(`${excepetion.response.data.error}`)

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      setUser(user)
      noteService.setToken(user.token)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
    } catch (excepetion) {
      setErrorMessage(`${excepetion.response.data.error}`)

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={() => {
          window.localStorage.removeItem('loggedNoteAppUser')
          noteService.setToken(null)
          setUser(null)
        }}>logout</button>
        {noteForm()}
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

import { React, useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from 'react-router-dom'
import Note from './components/Note'
import Notification from './components/Error'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import noteService from './services/notes'
import loginService from './services/login'

const Home = () => (
  <div>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const SingleNote = ({ note }) => {
  return (
    <div>
      <h2>Content: {note.content}</h2>
      <div>User: {note.user.name}</div>
      <div>Important: {note.important ? 'yes' : 'no'}</div>
    </div>
  )
}
const Notes = ({ notesToShow, user, toggleImportanceOf, deleteNote, showAll, setShowAll, noteFormRef, createNote, setErrorMessage }) => {
  return (
    <div>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      {user && <div>
        <Togglable buttonLabel='new note' ref={noteFormRef}>
          <NoteForm
            createNote={createNote}
            setErrorMessage={setErrorMessage}
          />
        </Togglable>
      </div>
      }

      <ul>
        <Table striped>
          <tbody>
            {notesToShow.map(note =>
              <Note
                key={note.id}
                note={note}
                user={user}
                toggleImportance={() => toggleImportanceOf(note.id)}
                deleteNote={() => deleteNote(note.id)}
                Link={Link}
              />
            )}
          </tbody>
        </Table>
      </ul>
    </div>
  )
}

const Users = () => (
  <div>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const noteFormRef = useRef()
  const navigate = useNavigate()

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

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      setUser(user)
      setMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      noteService.setToken(user.token)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      navigate('/')
    } catch (exception) {
      setErrorMessage(`${exception.response.data.error}`)

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

  const createNote = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject)
      noteFormRef.current.toggleVisibility()
      setNotes(notes.concat(returnedNote))
    } catch (exception) {
      setErrorMessage(`${exception.response.data.error}`)

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
    } catch (exception) {
      exception.response.data.error !== undefined
        ? setErrorMessage(`${exception.response.data.error}`)
        : setErrorMessage(`${exception.message}`)

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const deleteNote = async (id) => {
    try {
      await noteService.remove(id)
      setNotes(notes.filter(note => note.id !== id))
    } catch (exception) {
      exception.response.data.error !== undefined
        ? setErrorMessage(`${exception.response.data.error}`)
        : setErrorMessage(`${exception.message}`)

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const match = useMatch('/notes/:id')
  const noteToShow = match
    ? notes.find(n => n.id === match.params.id)
    : null

  const padding = {
    padding: 5
  }

  return (
    <div className='container'>
      <h1>Notes</h1>

      <Notification message={errorMessage} />
      {(message &&
        <Alert variant="success">
          {message}
        </Alert>
      )}

      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>home</Link>
            </Nav.Link>
            <Nav.Link href='#notes' as='span'>
              <Link style={padding} to='/notes'>notes</Link>
            </Nav.Link>
            <Nav.Link href='#users' as='span'>
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href='#login' as='span'>
              {user
                ? <em>{user.name} logged in <button onClick={handleLogout}>logout</button></em>
                : <Link style={padding} to='/login'>login</Link>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes
          notesToShow={notesToShow}
          user={user}
          toggleImportanceOf={toggleImportanceOf}
          deleteNote={deleteNote}
          showAll={showAll}
          setShowAll={setShowAll}
          noteFormRef={noteFormRef}
          createNote={createNote}
          setErrorMessage={setErrorMessage} />} />
        <Route path='/notes/:id' element={<SingleNote note={noteToShow} />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={<LoginForm handleLogin={handleLogin} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
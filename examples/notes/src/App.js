import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Error'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  if(!notes) {
    return null
  }

  const addNote = (event) => {
    event.preventDefault()

    if(newNote === '') {
      setErrorMessage(
        `Note must not be null`
      )
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)

      return
    }

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
  
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      .catch(error => {
        setErrorMessage(`${error.response.data.error}`)
        
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)

        return
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        if(returnedNote) {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        } else {
          throw new Error(`Note doesn't exist`)
        }
      })
      .catch(error => {
        setErrorMessage(`${error.message}`)

        setTimeout(() => {
          setErrorMessage('')
        }, 3000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const deleteNote = (id) => {
    noteService
      .remove(id)
      .catch(error => {
        setErrorMessage(`${error.response.data.error}`)

        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
      })

      setNotes(notes.filter(note => note.id !== id))
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <form onSubmit={addNote}>
        <input
          value={newNote}

          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App
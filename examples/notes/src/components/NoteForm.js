import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NoteForm = ({ createNote, setErrorMessage }) => {
  const [note, setNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    if (note === '') {
      setErrorMessage('Note must not be null')

      setTimeout(() => {
        setErrorMessage('')
      }, 3000)

      return
    }

    createNote({
      content: note,
      important: true
    })

    setNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={note}
          onChange={({ target }) => setNote(target.value)}
          placeholder='write note content here'
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default NoteForm
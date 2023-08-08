import React, { useState } from 'react'

// eslint-disable-next-line react/prop-types
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
      important: false
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
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm

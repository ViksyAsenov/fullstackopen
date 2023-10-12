import React from 'react'
import Button from 'react-bootstrap/Button'

const Note = ({ note, user, toggleImportance, deleteNote, Link }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <tr className='note' key={note.id}>
      <td>
        <span><Link to={`/notes/${note.id}`}>{note.content}</Link></span>
        {(user !== null) && user.name === note.user.name ? <Button variant='primary' onClick={toggleImportance} id='toggle-importance-button'>{label}</Button> : null}
        {(user !== null) && user.name === note.user.name ? <Button variant='primary' onClick={deleteNote}>delete</Button> : null}
      </td>
      <td>
        {note.user.name}
      </td>
    </tr>
  )
}

export default Note
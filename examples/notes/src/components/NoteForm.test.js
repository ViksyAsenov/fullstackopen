import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

describe('<NoteForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const setErrorMessage = jest.fn()
    const user = userEvent.setup()

    render(<NoteForm createNote={createNote} setErrorMessage={setErrorMessage}/>)

    const input = screen.getByPlaceholderText('write note content here')
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing the form')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing the form')
  })
})
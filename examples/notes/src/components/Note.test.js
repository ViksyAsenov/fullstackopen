import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

describe('<Note />', () => {
  test('renders content', () => {
    const note = {
      content: 'testing the component',
      important: true
    }

    render(<Note note={note} />)

    const element = screen.getByText('testing the component')
    expect(element).toBeDefined()
  })

  test('clicking the toggle importance button calls event handler once', async () => {
    const note = {
      content: 'testing the component',
      important: true
    }

    const mockHandler = jest.fn()

    render(
      <Note note={note} toggleImportance={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
import { React, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={(event) => {
        event.preventDefault()
        handleLogin({ username, password })
      }}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant='primary' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
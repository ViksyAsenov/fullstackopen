import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Button } from './styles/Button.styled'
import { Input } from './styles/Input.styled'
import { LoginFormContainer, Form } from './styles/LoginForm.styled'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  return (
    <LoginFormContainer>
      <h2>Login</h2>

      <Form
        onSubmit={(event) => {
          event.preventDefault()
          dispatch(loginUser({ username, password }))
        }}
      >
        <div className="inputDiv">
          username
          <Input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="inputDiv">
          password
          <div className="passwordContainer">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button id="passwordToggleButton" onClick={() => setShowPassword(!showPassword)} type="button">
              {showPassword ? 'hide' : 'show'}
            </Button>
          </div>
        </div>
        <Button id="login-button" type="submit">
          login
        </Button>
      </Form>
    </LoginFormContainer>
  )
}

export default LoginForm

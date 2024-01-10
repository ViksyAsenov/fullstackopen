import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import { Container } from './components/styles/Container.styled'
import { StyledHeader } from './components/styles/Header.styled'
import { Button } from './components/styles/Button.styled'
import { Navigation } from './components/styles/Navigation.styled'
import { Footer } from './components/styles/Footer.styled'

import GlobalStyles from './components/styles/Global'
import { ThemeProvider } from 'styled-components'
import { clearUser, setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const loggedBlogAppUserJSON = window.localStorage.getItem('loggedBlogAppUser')

  useEffect(() => {
    if (loggedBlogAppUserJSON) {
      const user = JSON.parse(loggedBlogAppUserJSON)

      dispatch(setUser(user))
    }
  }, [dispatch, loggedBlogAppUserJSON])

  const theme = {
    colors: {
      header: '#ebfbff',
      body: '#769799',
      footer: '#003333',
      darkText: '#0c3d3d',
      lightText: '#dff1f5',
      darkBody: '#2f5b5c',
      lightBody: '#bcd3d6',
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GlobalStyles />

        <StyledHeader>
          <h2>Bloglist</h2>
        </StyledHeader>

        <Notification />

        {!user && <LoginForm />}

        {user && (
          <Navigation>
            <div>
              <Link className="Link" to="/">
                Blogs
              </Link>
              <Link className="Link" to="/users">
                Users
              </Link>
            </div>
            <div>
              {user.name} logged in{' '}
              <Button id="logout-button" onClick={() => dispatch(clearUser())}>
                Logout
              </Button>
            </div>
          </Navigation>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={loggedBlogAppUserJSON ? <SingleUser /> : <Navigate replace to="/" />} />
          <Route path="/:id" element={loggedBlogAppUserJSON ? <SingleBlog /> : <Navigate replace to="/" />} />
        </Routes>

        <Footer>
          <h2>Made by Viksy</h2>
        </Footer>
      </Container>
    </ThemeProvider>
  )
}

export default App

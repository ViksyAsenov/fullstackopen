import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendation from './components/Recommendation'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('books')
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setUser(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user === null ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('recommendation')}>recommendation</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} user={user} />

      <Books show={page === 'books'} />

      <Recommendation show={page === 'recommendation'} />

      <Login show={page === 'login'} setUser={setUser} setPage={setPage} />

      <NewBook show={page === 'add'} setPage={setPage} />
    </div>
  )
}

export default App

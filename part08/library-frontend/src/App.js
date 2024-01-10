import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendation from './components/Recommendation'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE, BOOK_ADDED } from './utils/queries'

export const updateCache = (cache, bookAdded) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    return { allBooks: uniqByTitle(allBooks.concat(bookAdded)) }
  })

  bookAdded.genres.forEach((genre) => {
    const response = cache.readQuery({
      query: BOOKS_BY_GENRE,
      variables: { genre },
    })

    if (response && response.allBooks) {
      cache.updateQuery({ query: BOOKS_BY_GENRE, variables: { genre } }, ({ allBooks }) => {
        return { allBooks: uniqByTitle(allBooks.concat(bookAdded)) }
      })
    } else {
      cache.writeQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre },
        data: { allBooks: [bookAdded] },
      })
    }
  })
}

const App = () => {
  const [page, setPage] = useState('books')
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded
      window.alert(`New book with title ${bookAdded.title} and author ${bookAdded.author.name} was added`)

      updateCache(client.cache, bookAdded)
    },
  })

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

      <Recommendation show={page === 'recommendation'} user={user} />

      <Login show={page === 'login'} setUser={setUser} setPage={setPage} />

      <NewBook show={page === 'add'} setPage={setPage} />
    </div>
  )
}

export default App

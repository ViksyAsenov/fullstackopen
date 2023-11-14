import { useEffect, useState } from 'react'
import { USER, BOOKS_BY_GENRE } from '../utils/queries'
import { useLazyQuery, useQuery } from '@apollo/client'

const Recommendation = ({ show, user }) => {
  const [me, setMe] = useState(null)
  const [books, setBooks] = useState([])

  const meResult = useQuery(USER)
  const [fetchBooks, booksResult] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      setMe(meResult.data.me)

      fetchBooks({ variables: { genre: meResult.data.me.favouriteGenre } })
    }
  }, [meResult, setMe, fetchBooks])

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult, setBooks])

  if (!show) {
    return null
  }

  if (!meResult.data || !booksResult.data) {
    return <div>...loading</div>
  }

  return (
    <div>
      <h2>Recommendation</h2>

      <p>
        Hello <b>{me.username}</b>, these are all the books in your favourite genre <b>{me.favouriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendation

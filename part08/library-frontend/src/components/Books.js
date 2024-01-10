import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../utils/queries'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')
  const { loading: allBooksLoading, data: allBooksData } = useQuery(ALL_BOOKS)
  const { loading: booksByGenreLoading, data: booksByGenreData } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  })

  useEffect(() => {
    if (allBooksData) {
      const allGenres = ['all genres']
      allBooksData.allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!allGenres.includes(genre)) {
            allGenres.push(genre)
          }
        })
      })
      setGenres(allGenres)
    }
  }, [allBooksData])

  if (!props.show) {
    return null
  }

  if (allBooksLoading || booksByGenreLoading) {
    return <div>loading...</div>
  }

  const booksToShow = genre === '' ? allBooksData.allBooks : booksByGenreData.allBooks
  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre === '' ? 'all genres' : genre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.length > 0 &&
          genres.map((genre) => {
            return (
              <button onClick={() => setGenre(genre === 'all genres' ? '' : genre)} key={genre}>
                {genre}
              </button>
            )
          })}
      </div>
    </div>
  )
}

export default Books

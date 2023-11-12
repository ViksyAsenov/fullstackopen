import { USER, BOOKS_BY_GENRE } from '../utils/queries'
import { useQuery } from '@apollo/client'

const Recommendation = ({ show }) => {
  const result = useQuery(USER, {
    onError: (error) => {
      console.log(error)
    },
  })

  const { data: booksByGenreData } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: result.data?.me.favouriteGenre || '' },
  })

  if (!show) {
    return null
  }

  if (!result.data) {
    return <div>...loading</div>
  }

  return (
    <div>
      <h2>Recommendation</h2>

      <p>
        Hello <b>{result.data.me.username}</b>, these are all the books in your favourite genre{' '}
        <b>{result.data.me.favouriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenreData.allBooks.map((a) => (
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

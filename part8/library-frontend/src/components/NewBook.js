import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS, BOOKS_BY_GENRE } from '../utils/queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, { data: { addBook } }) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return { allBooks: allBooks.concat(addBook) }
      })

      genres.forEach((genre) => {
        const response = cache.readQuery({
          query: BOOKS_BY_GENRE,
          variables: { genre },
        })

        if (response && response.allBooks) {
          cache.updateQuery({ query: BOOKS_BY_GENRE, variables: { genre } }, ({ allBooks }) => {
            return { allBooks: allBooks.concat(addBook) }
          })
        } else {
          cache.writeQuery({
            query: BOOKS_BY_GENRE,
            variables: { genre },
            data: { allBooks: [addBook] },
          })
        }
      })
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    },
    onCompleted: () => {
      props.setPage('books')
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published: parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook

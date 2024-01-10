import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {

    return filter.message === ''
      ? [...anecdotes]
      : [...anecdotes.filter(anecdote => anecdote.content.includes(filter.message))]
  })
  

  anecdotes.sort((a1, a2) => a2.votes - a1.votes)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => {
            dispatch(voteAnecdote(anecdote))

            dispatch(setNotification(`you voted the anecdote '${anecdote.content}'`, 5000))
          }}
        />
      )}
    </div>
  )
}

export default AnecdoteList
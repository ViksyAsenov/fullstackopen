import axios, { AxiosError } from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
  if(newAnecdote.content.length < 5) {
    throw new AxiosError('Anecdote must be atleast 5 symbols long', '400')
  }
  
  return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
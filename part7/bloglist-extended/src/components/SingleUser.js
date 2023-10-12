import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import { SingleUserContainer, SingleUserUl, SingleUserLi } from './styles/SingleUser.styled'
import usersService from '../services/users'

const SingleUser = () => {
  const match = useMatch('/users/:id')
  const [user, setUser] = useState(null)

  useEffect(() => {
    usersService.getByid(match.params.id).then((initialUser) => {
      setUser(initialUser)
    })
  }, [match.params.id])

  if (!user) {
    return null
  }

  return (
    <SingleUserContainer>
      <h1>{user.name}</h1>

      <h2>Added blogs:</h2>
      <SingleUserUl>
        {user.blogs.map((blog) => (
          <SingleUserLi key={blog.id}>{blog.title}</SingleUserLi>
        ))}
      </SingleUserUl>
    </SingleUserContainer>
  )
}

export default SingleUser

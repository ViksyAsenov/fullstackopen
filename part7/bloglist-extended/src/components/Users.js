import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UsersTable, UsersTableTr } from './styles/Users.styled'
import usersService from '../services/users'

const User = ({ user }) => (
  <UsersTableTr>
    <th>
      <Link to={`/users/${user.id}`} className="userName">
        {user.name}
      </Link>
    </th>
    <th>{user.blogs.length}</th>
  </UsersTableTr>
)

const Users = () => {
  const [users, setUsers] = useState([])
  const user = useSelector((state) => state.user)

  useEffect(() => {
    usersService.getAll().then((initialUsers) => {
      setUsers(initialUsers)
    })
  }, [])

  return (
    user && (
      <div>
        <UsersTable>
          <thead>
            <UsersTableTr>
              <th>Name</th>
              <th>Blogs created</th>
            </UsersTableTr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </UsersTable>
      </div>
    )
  )
}

export default Users

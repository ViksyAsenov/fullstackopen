const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'A cool blog',
    author: 'the cooler',
    url: 'http://www.bg.com',
    likes: 5
  },
  {
    title: 'Dojo Mojo House',
    author: 'ken',
    url: 'http://dojomojohouse.com',
    likes: 12
  }
]

const noneExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog.__id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  noneExistingId,
  blogsInDB,
  usersInDB
}
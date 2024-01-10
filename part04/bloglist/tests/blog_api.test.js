const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs.map(b => new Blog(b))

  const promiseArr = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArr)
})

describe('get blogs', () => {
  test('blogs are returned as json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Dojo Mojo House')
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of a blog is id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('post blogs', () => {
  let headers = null

  beforeEach(async () => {
    const newUser = {
      username: 'admin',
      name: 'Admin Adminov',
      password: 'topsecret',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `Bearer ${result.body.token}`
    }
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'a new blog',
      author: 'user',
      url: 'http://user.bg.com',
      likes: 34
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).toContain('a new blog')
  })

  test('a blog without likes property can be added and likes will have default value of 0', async () => {
    const newBlog = {
      title: 'a new blog',
      author: 'user',
      url: 'http://user.bg.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()

    const addedBlog = blogsAtEnd.find(b => b.title === 'a new blog')
    expect(addedBlog.likes).toBe(0)
  })

  test('an invalid blog should respond with 400', async () => {
    const newBlog = {
      author: 'user',
      likes: 54
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('put blogs', () => {
  let headers = null

  beforeEach(async () => {
    const newUser = {
      username: 'admin',
      name: 'Admin Adminov',
      password: 'topsecret',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `Bearer ${result.body.token}`
    }
  })

  test('update an existing blog with valid id and properties', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'user',
      url: 'www.abc.com',
      likes: 5
    }

    let uploadedBlogResult = await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsBeforeUpdate = await helper.blogsInDB()

    const updatedBlog = {
      title: 'A new blog',
      author: 'user',
      url: 'www.abc.com',
      likes: 25
    }

    await api
      .put(`/api/blogs/${uploadedBlogResult.body.id}`)
      .send(updatedBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await helper.blogsInDB()
    expect(blogsBeforeUpdate.length).toBe(blogsAfterUpdate.length)

    const updatedBlogFromDB = blogsAfterUpdate.find(b => b.title === updatedBlog.title)
    expect(updatedBlogFromDB.likes).toBe(25)
  })
})

describe('delete blogs', () => {
  let headers = null

  beforeEach(async () => {
    const newUser = {
      username: 'admin',
      name: 'Admin Adminov',
      password: 'topsecret',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `Bearer ${result.body.token}`
    }
  })

  test('an existing blog can be deleted with valid id', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'user',
      url: 'www.abc.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)

    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart.find(blog => blog.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author || false,
    url: body.url,
    likes: body.likes || 0,
    comments: body.comments || [],
    user: user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user
  const blogToUpdate = await Blog.findById(request.params.id)

  if(body.comments !== undefined && Object.keys(body).length === 1) {
    blogToUpdate.comments = body.comments
    let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true , runValidators: true, context: 'query' })
    return response.json(updatedBlog)
  }

  if (body.likes !== undefined && Object.keys(body).length === 1) {
    blogToUpdate.likes = body.likes
    let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true , runValidators: true, context: 'query' })
    return response.json(updatedBlog)
  }

  if(!(blogToUpdate.user._id.toString() === user._id.toString())) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true , runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)

  if(!(blogToDelete.user._id.toString() === user._id.toString())) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
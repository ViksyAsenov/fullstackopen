import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from './styles/Button.styled'
import { Input } from './styles/Input.styled'
import { BlogFormContainer, Form } from './styles/BlogForm.styled'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    if (title === '' || author === '' || url === '') {
      const newNotification = {
        message: "Blog fields shouldn't be null",
        positive: false,
      }
      dispatch(setNotification(newNotification, 3000))

      return
    }

    try {
      dispatch(createBlog(title, author, url))
      blogFormRef.current.toggleVisibility()
      const newNotification = {
        message: `a new blog '${title}' by ${author} has been added`,
        positive: true,
      }
      dispatch(setNotification(newNotification, 3000))
    } catch (exception) {
      const newNotification = {
        message: `${exception.response.data.error}`,
        positive: false,
      }
      dispatch(setNotification(newNotification, 3000))
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <BlogFormContainer>
      <h2>Create a blog</h2>

      <Form onSubmit={addBlog}>
        <div className="inputDiv">
          Title
          <Input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>

        <div className="inputDiv">
          Author
          <Input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>

        <div className="inputDiv">
          Url
          <Input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <Button type="submit">Create</Button>
      </Form>
    </BlogFormContainer>
  )
}

export default BlogForm

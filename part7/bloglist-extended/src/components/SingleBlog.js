import { useEffect, useState, useRef } from 'react'
import { useMatch } from 'react-router-dom'
import blogsService from '../services/blogs'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { Button } from './styles/Button.styled'
import { Input } from './styles/Input.styled'
import Togglable from './Togglable'
import { SingleBlogContainer, SingleBlogUl, SingleBlogLi, SingleBlogForm } from './styles/SingleBlog.styled'

const Form = ({ commentTheBlog, comment, setComment, commentFormRef }) => {
  return (
    <SingleBlogForm
      onSubmit={(event) => {
        event.preventDefault()
        commentTheBlog(comment)
        commentFormRef.current.toggleVisibility()
        setComment('')
      }}
    >
      <h2>Add a comment</h2>
      <div className="inputDiv">
        comment
        <Input
          type="text"
          value={comment}
          name="Comment"
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
      </div>
      <Button type="submit">Add</Button>
    </SingleBlogForm>
  )
}

const SingleBlog = () => {
  const match = useMatch('/:id')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')
  const commentFormRef = useRef()

  useEffect(() => {
    blogsService.getById(match.params.id).then((initialBlog) => {
      setBlog(initialBlog)
    })
  }, [match.params.id])

  if (!blog) {
    return null
  }

  const likeTheBlog = () => {
    dispatch(likeBlog(blog))
    setBlog({ ...blog, likes: blog.likes + 1 })
  }

  const commentTheBlog = (comment) => {
    dispatch(commentBlog(blog, comment))
    setBlog({ ...blog, comments: blog.comments.concat(comment) })
  }

  const deleteTheBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  return (
    <SingleBlogContainer>
      <h1>
        {blog.title} | {blog.author}
      </h1>

      <p>Url: {blog.url}</p>
      <p id="like-count">
        Likes: {blog.likes}{' '}
        <Button onClick={() => likeTheBlog()} id="like-button">
          like
        </Button>
      </p>
      <p>Added by {blog.user.name}</p>
      {blog.user.username === user.username && (
        <Button id="delete-button" onClick={() => deleteTheBlog()}>
          Remove
        </Button>
      )}

      <h2>Comments:</h2>
      <Togglable buttonLabel="New" ref={commentFormRef}>
        <Form
          commentTheBlog={commentTheBlog}
          comment={comment}
          setComment={setComment}
          commentFormRef={commentFormRef}
        />
      </Togglable>

      <SingleBlogUl>
        {blog.comments.map((comment) => (
          <SingleBlogLi key={comment.id}>{comment}</SingleBlogLi>
        ))}
      </SingleBlogUl>
    </SingleBlogContainer>
  )
}

export default SingleBlog

import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { initializeBlogs } from '../reducers/blogReducer'

const Home = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    user && (
      <div>
        <Togglable buttonLabel="New" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>

        {[...blogs]
          .sort((b1, b2) => b2.likes - b1.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    )
  )
}

export default Home

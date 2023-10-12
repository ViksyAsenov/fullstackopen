import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const updatedBlog = action.payload

      return state.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      const deletedBlog = action.payload

      return state.filter((blog) => blog.id !== deletedBlog.id)
    },
  },
})

export const { updateBlog, appendBlog, setBlogs, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ title, author, url })
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 })
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      const newNotification = {
        message: `${exception.response.data.error}`,
        positive: false,
      }
      dispatch(setNotification(newNotification, 3000))
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, { comments: blog.comments.concat(comment) })
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      const newNotification = {
        message: `${exception.response.data.error}`,
        positive: false,
      }
      dispatch(setNotification(newNotification, 3000))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog))
    } catch (exception) {
      const newNotification = {
        message:
          exception.response.data.error !== undefined ? `${exception.response.data.error}` : `${exception.message}`,
        positive: false,
      }
      dispatch(setNotification(newNotification, 3000))
    }
  }
}

export default blogSlice.reducer

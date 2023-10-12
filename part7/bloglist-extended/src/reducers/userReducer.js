import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const { username, name, token } = action.payload
      blogService.setToken(token)

      return { username, name, token }
    },
    clearUser(state, action) {
      window.localStorage.removeItem('loggedBlogAppUser')
      blogService.setToken(null)

      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)

      dispatch(setUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (exception) {
      const newNotification = {
        message: `${exception.response.data.error}`,
        positive: false,
      }
      dispatch(setNotification(newNotification, 3000))
    }
  }
}

export default userSlice.reducer

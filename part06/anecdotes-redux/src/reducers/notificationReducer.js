import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '' },
  reducers: {
    updateNotification(state, action) {
      return { ...state, message: action.payload}
    },
    clearNotification(state, action) {
      return { ...state, message: ''}
    }
  }
})

export const { updateNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, displayTime) => {
  return async dispatch => {
    dispatch(updateNotification(notification))

    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}

export default notificationSlice.reducer
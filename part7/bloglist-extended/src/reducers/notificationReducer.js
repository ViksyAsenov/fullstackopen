import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', positive: false },
  reducers: {
    updateNotification(state, action) {
      return { ...state, message: action.payload.message, positive: action.payload.positive }
    },
    clearNotification(state, action) {
      return { ...state, message: '', positive: false }
    },
  },
})

export const { updateNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, displayTime) => {
  return async (dispatch) => {
    dispatch(updateNotification(notification))

    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}

export default notificationSlice.reducer

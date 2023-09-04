import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, message: action.payload.message }
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: ''}
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: '' })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
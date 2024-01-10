import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, positive } = useSelector((state) => state.notification)

  if (message === '') {
    return null
  }

  if (positive) {
    return <div className="success">{message}</div>
  }

  return <div className="error">{message}</div>
}

export default Notification

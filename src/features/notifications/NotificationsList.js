import { parseISO, formatDistanceToNow } from 'date-fns'
import { useSelector } from 'react-redux'
import { selectAllNotifications, makeAllRead } from './notificationSlice'
import { selectAllUsers } from '../users/UsersSlice'
import classnames from 'classnames'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'

export const NotificationsList = () => {
  const allUsers = useSelector(selectAllUsers)
  const allNotifications = useSelector(selectAllNotifications)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(makeAllRead())
  })

  const renderedNotifications = allNotifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = allUsers.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    const notificationClassname = classnames('notification', {
      new: notification.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

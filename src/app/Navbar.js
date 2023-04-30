import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationSlice'

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleRefreshNotifications = () => {
    dispatch(fetchNotifications());
  };

  const allNotifications = useSelector(selectAllNotifications);
  const numOfUnreadNotifications = allNotifications.filter(n => !n.read).length;

  let notificationBadge;

  if(numOfUnreadNotifications > 0) {
    notificationBadge = <span className='badge'>{numOfUnreadNotifications}</span>
  }


  return (
    <nav>
      <section>
        <h1>Redux Social Media App</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to='/'>posts</Link>
            <Link to='/users'>Users</Link>
            <Link to='/notifications'>Notifications{notificationBadge}</Link>
          </div>
          <button onClick={handleRefreshNotifications}>Refresh Notifications</button>
        </div>
      </section>
    </nav>
  )
}

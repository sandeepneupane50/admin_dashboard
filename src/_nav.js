import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilSoccer } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    id:'create_futsals',
    component: CNavItem,
    name: 'Futsals',
    to: '/futsals',
    icon: <CIcon icon={cilSoccer} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Bookings',
    to: '/bookings',
    icon: <CIcon icon={cilSoccer} customClassName="nav-icon" />,
  },
]

export default _nav

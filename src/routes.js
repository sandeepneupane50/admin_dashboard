import React from 'react'
import Futsals from './views/Futsal'
import FutsalCreate from './views/Futsal/Create'
import FutsalUpdate from './views/Futsal/Update'
import BookingForm from './views/Booking/Form'
import Bookings from './views/Booking'
import BookingEdit from './views/Booking/Edit'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/futsals', name: 'Futsals', element: Futsals },
  { path: '/futsals/create', name: 'FutsalCreate', element: FutsalCreate },
  { path: '/futsals/:id/edit', name: 'FutsalUpdate', element: FutsalUpdate },
  { path: '/bookings', name:'Bookings', element: Bookings },
  { path: '/bookings/form', name: 'BookingForm', element: BookingForm },
  { path: '/bookings/:id/edit', name: 'BookingEdit', element: BookingEdit },
]

export default routes

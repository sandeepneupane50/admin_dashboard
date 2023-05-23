import React from 'react'
import Futsals from './views/Futsal'
import FutsalCreate from './views/Futsal/Create'
import FutsalUpdate from './views/Futsal/Update'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/futsals', name: 'Futsals', element: Futsals },
  { path: '/futsals/create', name: 'FutsalCreate', element: FutsalCreate },
  { path: '/futsals/:id/edit', name: 'FutsalUpdate', element: FutsalUpdate },
]

export default routes

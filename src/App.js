import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginForm from './authentication/LoginForm'
import RegisterForm from './authentication/RegisterForm'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path= '/login' name='LoginForm' element= {<LoginForm/>} />
            <Route path= '/register' name='RegisterForm' element= {<RegisterForm/>}/>
            <Route path="*" name="Home" element={
                <ProtectedRoute>
                    <DefaultLayout />
                </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App

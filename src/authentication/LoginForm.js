import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { addUser } from 'src/util/apiroutes'

const LoginForm = () => {
  const[email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your login API passing the username and password
      let response = await axios.post(`${addUser}/login`, {
        email: email, password: password
      })
      // Assuming your login API returns a token on successful login
      const token = response.data.access_token;
      // const username = response.data.username;

      // Store the token in localStorage (you may use cookies as well)
      localStorage.setItem('token', token);

      // Redirect the user to the home/dashboard page after successful login
      navigate('/');
    } catch (error) {
      // Handle login errors here, e.g., display an error message
      console.error('Login error:', error);
    }
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                       placeholder="Email"
                       autoComplete="Email"
                       name="email"
                       value={email}
                       id='email'
                       type="email"
                       onChange={(e)=>setEmail(e.target.value)}
                       required
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={password}
                        id='password'
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type='submit'>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5">
                <CCardBody className="text-center">
                  <div>
                    <h1>Sign up</h1>
                    <p>
                      Register for new user
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Sign Up!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default LoginForm;

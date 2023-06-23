import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { addUser } from 'src/util/apiroutes'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const[username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${addUser}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
      body: JSON.stringify({ email: username, password })
    })
    .then((response)=>response.json())
    .then((response)=>{
      const token = response.accessToken;
      if (!token) {
          alert('Unable to login. Please try after some time.');
          return;
      }
      localStorage.clear();
      localStorage.setItem('user-token', token);
      setTimeout(() => {
          navigate('/');
      }, 500);
    }).catch((error) => {
      alert("Oops! Some error occured.", error);
  });
      
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
                       placeholder="Username"
                       autoComplete="username"
                       name="username"
                       value={username}
                       onChange={(e)=>setUsername(e.target.value)}
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
                        onChange={(e)=>setPassword(e.target.value)}
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

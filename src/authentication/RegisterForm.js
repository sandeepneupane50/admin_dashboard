import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow,} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { addUser } from 'src/util/apiroutes'

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(username.length < 3){
            setError({
                username:"must be atleast 3 letter"
            })
        }else if(!validateEmail(email)){
            setError({
                email:"invalid(eg: abc@gmail.com)"
            })
        } else if(password.length < 8){
            setError({
                password:"must be atleast of 8 letter"
            })
        } else if(password !== confirmPassword){
            setError({
                confirmPassword:"doesnot matched"
            })
        }else {
            const user = {
                username,
                email,
                password,
                confirmPassword
            }
    
            fetch(`${addUser}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            }).then(()=>{
                alert('sucessfully registered..')
                navigate('/login');
            })
        }

    }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit} method="POST" >
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-1">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)} />
                  </CInputGroup>
                  <p className='text-center'>
                    {error.username ?
                        <label className="create-error">{error.username}</label> : ''
                    }</p>
                  <CInputGroup className="mb-1">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                     />
                  </CInputGroup>
                  <p className='text-center'>
                    {error.email ?
                        <label className="create-error">{error.email}</label> : ''
                    }</p>
                  <CInputGroup className="mb-1">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}       
                    />
                  </CInputGroup>
                  <p className='text-center'>
                    {error.password ?
                        <label className="create-error">{error.password}</label> : ''
                    }</p>
                  <CInputGroup className="mb-1">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <p className='text-center'>
                    {error.confirmPassword ?
                        <label className="create-error">{error.confirmPassword}</label> : ''
                    }</p>
                  <div className="d-grid">
                    <CButton color="success" type='submit'>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default RegisterForm

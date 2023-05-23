import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { CCard, CCardBody, CCardTitle, CCardText, CButton, CLink } from '@coreui/react'

const Dashboard = () => {

  const [details, setDetails] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/details')
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        setDetails(data)
      })
      .catch(error => {
        console.error('error fetching:', error)
      })
  }, [])
  return (
    <>
      <div>
        <CCard style={{ width: '18rem' }}>
          <CCardBody>
            <CCardTitle>Total Registered:</CCardTitle>
            <CCardText><h1>{details.length}</h1></CCardText>
            <Link to="/futsals"><CButton>View ALL</CButton></Link>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Dashboard

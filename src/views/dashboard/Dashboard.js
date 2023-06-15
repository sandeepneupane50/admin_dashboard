import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { CCard, CCardBody, CCardTitle, CCardText, CButton, CLink } from '@coreui/react'
import { addFusal } from 'src/util/apiroutes';

const Dashboard = () => {

  const [details, setDetails] = useState([]);
  useEffect(() => {
    fetch(`${addFusal}/details`)
      .then(res => {
        return res.json()
      })
      .then(data => {
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
            <h2>{details.length}</h2>
            <Link to="/futsals"><CButton>View ALL</CButton></Link>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Dashboard

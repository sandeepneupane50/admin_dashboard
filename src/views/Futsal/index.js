import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { CButton, CButtonGroup } from '@coreui/react'
const Futsals = () => {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/details?_sort=id&_order=desc')
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


  const handleDelete = (detail) => {
    fetch(`http://localhost:8000/details/${detail.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Perform any additional actions if needed
        console.log('Data deleted successfully');
        // Update the state by fetching the updated data
        fetch('http://localhost:8000/details')
          .then(res => res.json())
          .then(data => {
            setDetails(data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting:', error);
      });
  };



  return (
    <CRow>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginBottom: 5 }}>
        <Link to={'/futsals/create'}>
          <CButton color="success" size="lg">
            Add New
          </CButton>
        </Link>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Futsal Table</strong> <small>Details of futsal ground</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">S.N</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Owners</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {details !== null && details.map((detail, index) => (
                <CTableBody key={detail.id}>
                  <CTableRow>
                    <CTableHeaderCell scope="row">
                      {index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell>{detail.company}</CTableDataCell>
                    <CTableDataCell>{detail.city}</CTableDataCell>
                    <CTableDataCell>{detail.contact}</CTableDataCell>
                    <CTableDataCell>
                        {detail.status}
                    </CTableDataCell>
                    <CTableDataCell>{detail.owner}</CTableDataCell>
                    <CTableDataCell>
                      <CButtonGroup role="group" aria-label="Basic mixed styles example">
                        <CButton color="warning" shape="rounded-0">
                        <Link to={`/futsals/${detail.id}/edit`}>Edit</Link>
                        </CButton>
                        <CButton onClick={() => handleDelete(detail)} color="danger" shape="rounded-0">
                          Delete
                        </CButton>
                      </CButtonGroup>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              ))}
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Futsals

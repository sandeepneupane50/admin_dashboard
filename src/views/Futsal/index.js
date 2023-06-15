import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addFusal, locationUrl } from 'src/util/apiroutes';
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
  CButton,
  CButtonGroup,
  CPagination,
  CPaginationItem
} from '@coreui/react';

const Futsals = () => {
  const [details, setDetails] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [npage, setNPage] = useState(0);

  const fetchData = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    fetch(`${addFusal}/details?_sort=id&_order=desc&_start=${startIndex}&_end=${endIndex}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // fetching cityname
  const fetchCities = async () => {
    const response = await fetch(`${locationUrl}/cities`);
    const data = await response.json();
    setCities(data);
  }

  useEffect(() => {
    fetchCities();
  }, [details]);
 
  useEffect(() => {
    fetchData();
  }, [currentPage]);


  const handleDelete = (detail) => {
    fetch(`${addFusal}/details/${detail.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Data deleted successfully');
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting:', error);
      });
  };

  useEffect(() => {
    fetchTotalCount();
  }, []);


  const fetchTotalCount = () => {
    fetch(`${addFusal}/details`)
      .then((res) => res.headers.get('X-Total-Count'))
      .then((count) => {
        setTotalCount(count);
        setNPage(Math.ceil(count / recordsPerPage));
      })
      .catch((error) => {
        console.error('Error fetching total count:', error);
      });
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage != npage) {
      setCurrentPage(currentPage + 1);
    } 
  };
  

  const numbers = [...Array(npage).keys()].map((n) => n + 1);


  return (
    <div>
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
                <CTableBody>
                  {details.map((detail, index) => (
                    <CTableRow key={detail.id}>
                      <CTableHeaderCell scope="row">{detail.id}</CTableHeaderCell>
                      <CTableDataCell>{detail.futsal}</CTableDataCell>
                      <CTableDataCell>{detail.city}</CTableDataCell>
                      <CTableDataCell>{detail.contact}</CTableDataCell>
                      <CTableDataCell>{detail.status === '1' ? 'Active' : 'Inactive'}</CTableDataCell>
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
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CPagination aria-label="Page navigation example" className="pagination">
        <CPaginationItem aria-label="Previous" className="page-itm">
          <button className="page-link" onClick={prePage} disabled={currentPage === 1}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </CPaginationItem>
        {numbers.map((n, index) => (
          <CPaginationItem
            className={`page-link ${currentPage === n ? 'active' : ''}`}
            key={index}
            onClick={() => changeCPage(n)}
          >
            {n}
          </CPaginationItem>
        ))}
        <div className="pagination-info">{currentPage}</div>
        <CPaginationItem aria-label="Next" className="page-item">
          <button className="page-link" onClick={nextPage} disabled={currentPage === npage}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </CPaginationItem>
      </CPagination>
    </div>
  );
};

export default Futsals;

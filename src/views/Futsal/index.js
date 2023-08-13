import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addFusal } from 'src/util/apiroutes';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CButtonGroup, CPagination, CPaginationItem, CFormInput, CForm, CFormSelect, } from '@coreui/react';
import axios from 'axios';
const Futsals = () => {
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  // const [totalCount, setTotalCount] = useState(0);
  const [npage, setNPage] = useState(0);
  const [inputSearch, setInputSearch] = useState('');
  const [inputSearchStatus, setInputSearchStatus] = useState('');

  // search bar
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${addFusal}/futsals?futsalname=${inputSearch}`);
      console.log(response);
      const data = await response.data;
      console.log(data);
      setDetails(data);
    }
    catch (error) {
      console.error("error fetching data:", error);
    }
  }
  useEffect(() => {
    if(inputSearch != '') {
      const debounce = setTimeout(() => {
        handleSearch()
      }, 1000);

      return () => {
        clearTimeout(debounce);
      }
    }
  }, [inputSearch]);

  const handleChange = (e) =>{
    const value = e.target.value;
    setInputSearch(value);
    // debounceOnChange(value);
  }

  const handleReset = async () => {
    fetchData();
    setInputSearch('');
  }

  // Sort bar
  const handleStatusChange = async (e) => {  
    try {
      const response = await axios.get(`${addFusal}/futsals?status=${e.target.value}`);
      const data = await response.data;
      setDetails(data);
    }
    catch (error) {
      console.error("error fetching data:", error);
    }
  }

  const fetchData = async () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    try{
    const response = await axios.get(`${addFusal}/futsals`)
    setDetails(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // res.data.data


  useEffect(() => {
    fetchData();
  }, [currentPage]);


  const handleDelete = async (futsalId) => {
    try {
      const response = await axios.delete(`${addFusal}/futsals/${futsalId}`);
      console.log('Deleted futsal:', response.data);
      fetchData()
    } catch (error) {
      console.error('Error deleting futsal:', error);
      // Handle error and show an error message on the frontend.
    }
  };


  // useEffect(() => {
  //   fetchTotalCount();
  // }, []);

  // const fetchTotalCount = () => {
  //   fetch(`${addFusal}/futsals`)
  //     .then((res) => res.headers.get('X-Total-Count'))
  //     .then((count) => {
  //       setTotalCount(count);
  //       setNPage(Math.ceil(count / recordsPerPage));
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching total count:', error);
  //     });
  // };

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
      <CRow className='justify-content-between mb-2'>
        <CCol>
          <CRow className="justify-content-start" >
            <CCol>
              <div className="btn-toolbar" >
                  <div className="btn-group me-2" >
                    <CFormInput
                      id='search_input'
                      type="text"
                      size="sm"
                      placeholder="futsal..."
                      value={inputSearch}
                      onChange={handleChange}
                    />
                  </div>
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    size="sm"
                    onClick={() => handleReset()}
                  >Reset
                  </button>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCol>
        <CCol className="d-grid gap-2 d-md-flex justify-content-md-end">

          <CCol xs={4}>
            <CFormSelect
              id="status"
              size="sm"
              name='status'
              value={inputSearchStatus}
              onChange={handleStatusChange}
            >
              <option>Search by Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </CFormSelect>
          </CCol>

          <Link to={'/futsals/create'}>
            <CButton color="success" >
              Add New
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Futsal Table</strong> <small>Details of futsal ground</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                {/* <CTableHeaderCell scope="col">S.N</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Owners</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {details?.map((detail, index) => (
                <CTableRow key={detail._id}>
                  {/* <CTableHeaderCell scope="row">{detail.id}</CTableHeaderCell> */}
                  <CTableDataCell>{detail.futsalname}</CTableDataCell>
                  <CTableDataCell>{detail.street}</CTableDataCell>
                  <CTableDataCell>{detail.contact}</CTableDataCell>
                  <CTableDataCell>{detail.status === 1 ? 'Active' : 'Inactive'}</CTableDataCell>
                  <CTableDataCell>{detail.owner}</CTableDataCell>
                  <CTableDataCell>
                    <CButtonGroup role="group" aria-label="Basic mixed styles example">
                      <CButton color="warning" shape="rounded-0">
                        <Link to={`/futsals/${detail._id}/edit`}>Edit</Link>
                      </CButton>
                      <CButton onClick={() => handleDelete(detail._id)} color="danger" shape="rounded-0">
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

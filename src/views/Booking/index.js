import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookFutsal } from 'src/util/apiroutes';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CButtonGroup, CPagination, CPaginationItem, CFormInput, CFormSelect } from '@coreui/react';
import axios from 'axios';

const Bookings = () => {
  const [books, setBooks] = useState({docs: []});
  const [currentPage, setCurrentPage] = useState(1);
  const [npage, setNPage] = useState(0);
  const [inputSearch, setInputSearch] = useState('');
  const [inputSearchStatus, setInputSearchStatus] = useState('');

  // search bar
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${bookFutsal}/bookings?page=${currentPage}&client=${inputSearch}`);
      const data = await response.data;
      setBooks(data);
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
      const response = await axios.get(`${bookFutsal}/bookings?page=${currentPage}&status=${e.target.value}`);
      const data = await response.data;
      setBooks(data);
    }
    catch (error) {
      console.error("error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async() => {
    try{
      const response = await axios.get(`${bookFutsal}/bookings?page=${currentPage}`);
      const data = response.data;
      setBooks(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete =async (bookingId) => {
    try {
      const response = await axios.delete(`${bookFutsal}/bookings/${bookingId}`);
      console.log('Deleted booking:', response.data);
      fetchData()
    } catch (error) {
      console.error('Error deleting booking:', error);
      // Handle error and show an error message on the frontend.
    }
  };

 

const prePage = () => {
    if(books.hasPrevPage == true) {
      setCurrentPage(books.prevPage);
    }
  };
  const nextPage = () => {
    if(books.hasNextPage == true) {
      setCurrentPage(books.nextPage);
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
                      placeholder="booking..."
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
              <option value="1">Confirm</option>
              <option value="0">Hold</option>
            </CFormSelect>
          </CCol>
          <Link to={'/bookings/form'}>
            <CButton color="success" >
              Book Now
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Booking Table</strong> <small>Details of booked list</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                {/* <CTableHeaderCell scope="col">S.N</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Team/Client</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">Futsal Booked</CTableHeaderCell>
                <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {books.docs.map((book, index) => (
                <CTableRow key={book.id}>
                  {/* <CTableHeaderCell scope="row">{book.id}</CTableHeaderCell> */}
                  <CTableDataCell>{book.client}</CTableDataCell>
                  <CTableDataCell>{book.contact}</CTableDataCell>
                  <CTableDataCell>{book.futsalname? (<span>{book.futsalname.futsalname}</span>):
                  (<span>N/A</span>)}</CTableDataCell>
                  <CTableDataCell>{book.paymentmethod}</CTableDataCell>
                  <CTableDataCell>{book.status === 1 ? 'Confirm' : 'Hold'}</CTableDataCell>
                  <CTableDataCell>
                    <CButtonGroup role="group" aria-label="Basic mixed styles example">
                      <CButton color="warning" shape="rounded-0">
                        <Link to={`/bookings/${book._id}/edit`}>Edit</Link>
                      </CButton>
                      <CButton onClick={() => handleDelete(book._id)} color="danger" shape="rounded-0">
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
          <CButton className={`page-link ${!books.hasPrevPage ? 'disabled' : ''}`} onClick={prePage} size="sm" >
                Prev
            {/* &laquo; */}
          </CButton>
        </CPaginationItem>
        <CPaginationItem
          className='page-link'
        >
          {books.page}
        </CPaginationItem>
        <CPaginationItem aria-label="Next" className="page-item">
          <CButton className={`page-link ${!books.hasNextPage ? 'disabled' : ''}`} size="sm" onClick={nextPage}>  
                Next
            {/* &raquo; */}
          </CButton>
        </CPaginationItem>
      </CPagination>
    </div>
  );
}

export default Bookings;
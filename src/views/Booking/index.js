import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookFutsal } from 'src/util/apiroutes';
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
  CPaginationItem,
  CFormInput,
  CForm,
  CFormSelect,
} from '@coreui/react';



const Bookings = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [npage, setNPage] = useState(0);
  const [inputSearch, setInputSearch] = useState('');
  const [inputSearchStatus, setInputSearchStatus] = useState('');

  // search bar

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${bookFutsal}/books?client=${inputSearch}`);
      const data = await response.json();
      setBooks(data);
    }
    catch (error) {
      console.error("error fetching data:", error);
    }


  }

  const handleReset = async () => {
    fetchData();
    setInputSearch('');
  }

  // Sort bar

  const handleStatusChange = async (e) => {
    try {
      const response = await fetch(`${bookFutsal}/books?status=${e.target.value}`);
      const data = await response.json();
      setBooks(data);
    }
    catch (error) {
      console.error("error fetching data:", error);
    }
  }



  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    fetch(`${bookFutsal}/books?_sort=id&_order=desc&_start=${startIndex}&_end=${endIndex}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };



  const handleDelete = (book) => {
    fetch(`${bookFutsal}/books/${book.id}`, {
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
    fetch(`${bookFutsal}/books`)
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
      <CRow className='justify-content-between mb-2'>
        <CCol>
          <CRow className="justify-content-start" >
            <CCol>
              <div className="btn-toolbar" >
                <CForm onSubmit={handleSearch}>
                  <div className="btn-group me-2" >
                    <CFormInput
                      type="text"
                      size="sm"
                      placeholder="bookings..."
                      value={inputSearch}
                      onChange={(e) => setInputSearch(e.target.value)}
                    />
                  </div>
                  <div className="btn-group me-2"  >
                    <button
                      className="btn btn-outline-info"
                      type="submit"
                      size="sm"
                    >Search
                    </button>
                  </div>
                </CForm>
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
                <CTableHeaderCell scope="col">S.N</CTableHeaderCell>
                <CTableHeaderCell scope="col">Team/Client</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">Futsal Booked</CTableHeaderCell>
                <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {books.map((book, index) => (
                <CTableRow key={book.id}>
                  <CTableHeaderCell scope="row">{book.id}</CTableHeaderCell>
                  <CTableDataCell>{book.client}</CTableDataCell>
                  <CTableDataCell>{book.contact}</CTableDataCell>
                  <CTableDataCell>{book.futsalname}</CTableDataCell>
                  <CTableDataCell>{book.paymentmethod}</CTableDataCell>
                  <CTableDataCell>{book.status === '1' ? 'Confirm' : 'Hold'}</CTableDataCell>
                  <CTableDataCell>
                    <CButtonGroup role="group" aria-label="Basic mixed styles example">
                      <CButton color="warning" shape="rounded-0">
                        <Link to={`/bookings/${book.id}/edit`}>Edit</Link>
                      </CButton>
                      <CButton onClick={() => handleDelete(book)} color="danger" shape="rounded-0">
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
}

export default Bookings;
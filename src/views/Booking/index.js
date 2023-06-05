import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookfutsal } from 'src/util/apiroutes';
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



const Bookings = () => {
    const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [npage, setNPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    fetch(`${bookfutsal}/books?_sort=id&_order=desc&_start=${startIndex}&_end=${endIndex}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

 

  const handleDelete = (book) => {
    fetch(`${bookfutsal}/books/${book.id}`, {
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
    fetch(`${bookfutsal}/books`)
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
          <Link to={'/bookings/form'}>
            <CButton color="success" size="lg">
              Book Now
            </CButton>
          </Link>
        </div>
        <CCol xs={12}>
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
}
 
export default Bookings;
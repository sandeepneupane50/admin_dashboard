import React, { useState, useEffect } from 'react';
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCard } from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookFutsal, addFusal } from 'src/util/apiroutes';
import SelectedProvince from '../components/SelectProvince'
import SelectedDistrict from '../components/SelectDistrict'
import SelectedCity from '../components/SelectCity'
import Select from 'react-select'

const BookingEdit = () => {
  const [client, setClient] = useState('')
  const [contact, setContact] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('')
  const [futsals, setFutsals] = useState([]);
  const [selectedFutsal, setSelectedFutsal] = useState();
  const [bookdate, setBookDate] = useState('')
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [status, setStatus] = useState('')
  const [ground, setGround] = useState('')
  const [paymentmethod, setPaymentmethod] = useState('')
  const [error, setError] = useState([])
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate();


  const getProvince = (selectedProvince) => {
    setSelectedProvince(selectedProvince);
    setSelectedDistrict('');
  }

  const getDistrict = (selectedDistrict) => {
    setSelectedDistrict(selectedDistrict);
    setSelectedCity('');
  }
  const getCity = (selectedCity) => {
    setSelectedCity(selectedCity);
  }
  
  const fetchFutsals = async () => {
    try {
      const response = await fetch(`${addFusal}/details?city=${selectedCity}&status=1`);
      const data = await response.json();
      const futsalNames = data.map((futsal) => ({ id: futsal.id, name: futsal.futsal }));
      setFutsals(futsalNames);
    } catch (error) {
      console.error('Error fetching futsals:', error);
    }
  };

  // fetching timeslots
  const fetchSlots = async () => {
    try {
      const response = await fetch(`${addFusal}/details?id=${selectedFutsal}`)
      const data = await response.json();
      if(data.length > 0) {
        const timeSlots = data[0]['timeSlots'];
        setSlots(timeSlots);
      }
    } catch (error) {
      console.error('Error fetching timeSlots:', error);
    }
  };


  const handleFutsalChange = (event) => {
    setSelectedFutsal(event.target.value);
    setSelectedSlots([]);
  }

  async function fetchData() {
    const response = await fetch(`${bookFutsal}/books?futsal=${selectedFutsal}&bookdate=${bookdate}`);
    const data = await response.json();
    let bookedSlots = new Set();
    data.forEach(element => {
      element.slots.forEach(slot => {
        bookedSlots.add(slot)
      })
    });
    setBookedSlots(Array.from(bookedSlots));
  }

  useEffect(() => {
    if (selectedFutsal !== '' && bookdate !== '') {
      fetchData();
    }
  }, [bookdate]);

  const slotOptions = () => {
    let availableSlots = slots.filter(x => !bookedSlots.includes(x));
    return availableSlots.map(slot => ({ label: slot, value: slot }));
  }

  const onSlotsChange = (slots) => {
    setSelectedSlots(slots);
  }

  const onOptionChange = e => {
    setStatus(e.target.value)
  }

  useEffect(() => {
    fetchBookings();
  }, []);



  useEffect(() => {
    fetchFutsals();
  }, [selectedCity]);

  useEffect(() => {
    fetchSlots();
  }, [selectedFutsal]);

  const { id } = useParams();
  const fetchBookings = () => {
    fetch(`${bookFutsal}/books?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const book = data[0];
          setClient(book.client);
          setContact(book.contact);
          setSelectedProvince(book.province);
          setSelectedDistrict(book.district);
          setSelectedCity(book.city);
          setSelectedFutsal(book.futsalname);
          setBookDate(book.bookdate);
          setSelectedSlots(book.slots.map(slot => ({ label: slot, value: slot})));
          setStatus(book.status);
          setGround(book.ground);
          setPaymentmethod(book.paymentmethod);
        }
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (client.length < 3) {
      setError({
        client: "invalid name"
      })
    } else if (contact.length != 10) {
      setError({
        contact: "it must be of 10 digit"
      })
    } else if (selectedProvince === "") {
      setError({
        province: "plz select province"
      })
    } else if (selectedDistrict === "") {
      setError({
        district: "plz select district"
      })
    } else if (selectedCity === "") {
      setError({
        city: "enter city"
      })
    } else if (selectedFutsal === "") {
      setError({
        company: "invalid city"
      })
    } else if (bookdate === '') {
      setError({
        bookdate: 'plz select time',
      });
    } 
    else if (selectedSlots === "") {
      setError({
        slot: "plz select"
      })
    }
     else if (ground.length === 0) {
      setError({
        ground: "invalid ground"
      })
    } else if (paymentmethod === '') {
      setError({
        paymentmethod: "plz select payment type"
      })
    } else if (status == '') {
      setError({
        status: "plz select"
      })
    } else {

    const bookData = {
      client,
      contact,
      province: selectedProvince,
      district: selectedDistrict,
      city: selectedCity,
      futsalname: selectedFutsal,
      bookdate,
      slots: selectedSlots.map(slots => slots.value),
      ground,
      paymentmethod,
      status,
    }
  
    try {
      const response = await fetch(`${bookFutsal}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      });

      if (response.ok) {
        navigate('/bookings');
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error updating book:', error);
      setError(true);
    }
  }
  };


  return (
    <>
      <div>
        <CCard style={{ padding: '3rem' }}>
          <CForm className="row g-3" onSubmit={handleSubmit} method="POST">
            <CCol xs={4}>
              <CFormInput
                id="Client"
                label="Team/Client Name:"
                placeholder="Team/Client Name"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
              {error.client ?
                <label className="create-error">{error.client}</label> : ''
              }
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                id="inputContact"
                label="Contact no:"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              {error.contact ?
                <label className="create-error">{error.contact}</label> : ''
              }
            </CCol>

            <CCol xs={4}>
            <SelectedProvince onChange={getProvince} selectedProvince={selectedProvince} />
              {error['province'] ?
                <label className="create-error">{error.province}</label> : ''
              }
            </CCol>

            <CCol xs={4}>
            <SelectedDistrict onChange={getDistrict} selectedProvince={selectedProvince} selectedDistrict={selectedDistrict}/>
              {error['district'] ?
                <label className="create-error">{error.district}</label> : ''
              }
            </CCol>

            <CCol md={4}>
            <SelectedCity onChange={getCity} selectedDistrict={selectedDistrict} selectedCity={selectedCity} />
              {error['city'] ?
                <label className="create-error">{error.city}</label> : ''
              }
            </CCol>
            <CCol md={4}>
              <CFormSelect
                id="futsal"
                label="Futsal:"
                value={selectedFutsal}
                onChange={handleFutsalChange}
                disabled={futsals.length === 0}>
                <option value="">select futsal</option>
                {futsals.map((futsal) => (
                  <option key={futsal.id} value={futsal.id}>
                    {futsal.name}
                  </option>
                ))}
              </CFormSelect>
              {error['futsal'] ?
                <label className="create-error">{error.futsal}</label> : ''
              }
            </CCol>
            <CCol xs={4}>
              <CFormInput
                label="Booking Date:"
                type="date"
                id="bookime"
                value={bookdate}
                onChange={(e) => setBookDate(e.target.value)}
              />
              {error['bookdate'] ?
                <label className="create-error">{error.bookdate}</label> : ''
              }
            </CCol>
            <CCol xs={4}>
              <label>Time Slots:</label>
              <Select
                isMulti
                name="colors"
                options={slotOptions()}
                className="basic-multi-select"
                classNamePrefix="select"
                disabled={slots.length === 0}
                value={selectedSlots}
                onChange={onSlotsChange}
              >
              </Select>
              {error['slot'] ? (
                <label className="create-error">{error.slot}</label>
              ) : null}
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                id="inputGround"
                label="Ground:"
                value={ground}
                onChange={(e) => setGround(e.target.value)}
              />
              {error.ground ?
                <label className="create-error">{error.ground}</label> : ''
              }
            </CCol>
            <CCol xs={4}>
              <CFormSelect
                id="inputPayment"
                label="Payment Method:"
                value={paymentmethod}
                onChange={(e) => setPaymentmethod(e.target.value)}>
                <option value="">payment type..</option>
                <option value="Cash">Handcash</option>
                <option value="Esewa">Esewa</option>
                <option value="Khalti">Khalti</option>
                <option value="Fonepay">Fonepay</option>
                <option value="IMEpay">IMEpay</option>
                <option value="MobileBanking">Mobile Banking</option>
              </CFormSelect>
              {error['paymentmethod'] ?
                <label className="create-error">{error.paymentmethod}</label> : ''
              }
            </CCol>
            <div>
              <CCol xs={3}>
                <label>Status:</label> <br></br>
                <CFormCheck
                  button={{ color: 'success', variant: 'outline' }}
                  type="radio"
                  name="status"
                  id="success-outlined"
                  label="Confirm"
                  value={1}
                  checked={status == 1}
                  onChange={onOptionChange}
                />
                <CFormCheck
                  button={{ color: 'warning', variant: 'outline' }}
                  type="radio"
                  name="status"
                  id="danger-outlined"
                  label="Hold"
                  value={0}
                  checked={status == 0}
                  onChange={onOptionChange}
                /><br></br>
                {error['status'] ?
                  <label className="create-error">{error.status}</label> : ''
                }
              </CCol>
            </div>
            <CCol xs={12}>
              <CButton type="submit">Book Me!</CButton>
            </CCol>
          </CForm>
        </CCard>
      </div>
    </>
  );
}

export default BookingEdit;
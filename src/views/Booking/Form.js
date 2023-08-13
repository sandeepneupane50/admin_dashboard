import React, { useState, useEffect } from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCard } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { bookFutsal, addFusal } from 'src/util/apiroutes'
import SelectedProvince from '../components/SelectProvince'
import SelectedDistrict from '../components/SelectDistrict'
import SelectedCity from '../components/SelectCity'
import axios from 'axios'

const BookingForm = () => {
  const [client, setClient] = useState('')
  const [contact, setContact] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('')
  const [futsals, setFutsals] = useState([]);
  const [selectedFutsal, setSelectedFutsal] = useState('');
  const [bookdate, setBookDate] = useState('')
  // timeslots
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [status, setStatus] = useState('')
  const [ground, setGround] = useState('')
  const [paymentmethod, setPaymentmethod] = useState('')
  const [error, setError] = useState([])
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate()


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
    setSelectedFutsal('')
  }


  const fetchFutsals = async () => {
    if(!selectedCity) {
      return;
    }
    try{
      let response = await axios.get(`${addFusal}/bookings/form/futsals?city=${selectedCity}&status=1`);
      const futsals = response.data;
      const futsalNames = futsals.map((futsal) => ({ id: futsal._id, name: futsal.futsalname}))
      setFutsals(futsalNames);
    } catch (error) {
        console.error('Error fetching futsals:', error);
      }
  };
  

  // fetching timeslots from futsals
  const fetchSlots = async () => {
    try {
      if(!selectedFutsal){
        return;
      }
      const response = await fetch(`${addFusal}/futsals?id=${selectedFutsal}`)
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

  // fetching booked slots from bookings
  async function fetchData() {
    let response = await axios.get(`${bookFutsal}/bookings/form/bookedSlots?futsal=${selectedFutsal}&bookdate=${bookdate}`);
    const data = response.data
    let bookedSlots = new Set();
    data.forEach(element => {
        element.slots.forEach(slot => {
        bookedSlots.add(slot)
      })
    });
    setBookedSlots(Array.from(bookedSlots));
  }

  useEffect(() => {
    if(selectedFutsal !== '' && bookdate !== '') {
      fetchData();
    }
  }, [bookdate]);

  const slotOptions = () => {
    let availableSlots = slots.filter(x => !bookedSlots.includes(x));
    return availableSlots.map(slot => ({ label: slot, value: slot}));
  }

  const onSlotsChange = (slots) => {
    setSelectedSlots(slots);
  }

  const onOptionChange = e => {
    setStatus(e.target.value)
  }

  useEffect(() => {
    fetchFutsals();
  }, [selectedCity]);

  useEffect(() => {
    fetchSlots();
  }, [selectedFutsal]);



  const handleSubmit = (event) => {
    event.preventDefault()
    const book = {
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

    if (client.length < 3) {
      setError({
        client: "invalid name"
      })
    } else if (contact.toString().length != 10) {
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
      axios.post(`${bookFutsal}/bookings/form` , {
        headers: {
          'Content-Type': 'application/json',
      },
        body: book,
      })
      .then(() => {
        alert('successfully booked...');
        navigate('/bookings')

      })
    }
  }

  return (
    <div>
      <CCard style={{ padding: '3rem' }}>
        <CForm className="row g-3" onSubmit={handleSubmit} method="POST">
          <CCol xs={4}>
            <CFormInput
              id="client"
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
              id="contact"
              label="Contact no:"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            {error.contact ?
              <label className="create-error">{error.contact}</label> : ''
            }
          </CCol>

          <CCol xs={4}>
          <SelectedProvince onChange={getProvince} />
            {error['province'] ?
              <label className="create-error">{error.province}</label> : ''
            }
          </CCol>

          <CCol xs={4}>
          <SelectedDistrict onChange={getDistrict} selectedProvince={selectedProvince} />
            {error['district'] ?
              <label className="create-error">{error.district}</label> : ''
            }
          </CCol>

          <CCol md={4}>
          <SelectedCity onChange={getCity} selectedDistrict={selectedDistrict} />
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
              id="bookDate"
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
             id='timeSlots'
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
              id="ground"
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
              id="payment"
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
                id="status"
                label="Confirm"
                value={1}
                checked={status == 1}
                onChange={onOptionChange}
              />
              <CFormCheck
                button={{ color: 'warning', variant: 'outline' }}
                type="radio"
                name="status"
                id="status-1"
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
  )
}
export default BookingForm
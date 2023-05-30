import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCard } from '@coreui/react'
import { useNavigate } from 'react-router-dom'


const BookingForm = () => {
  const [client, setClient] = useState('')
  const [contact, setContact] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [futsalname, setFutsalname] = useState('')
  const [booktime, setBooktime] = useState('')
  const [status, setStatus] = useState('')
  const [ground, setGround] = useState('')
  const [paymentmethod, setPaymentmethod] = useState('')
  const [error, setError] = useState([])
  const navigate = useNavigate()

  const onOptionChange = e => {
    setStatus(e.target.value)
    console.log(status)
  }

  const handleBookTime = (e) => {
    setBooktime(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const book = {
      client,
      contact,
      province,
      district,
      city,
      futsalname,
      booktime,
      ground,
      paymentmethod,
      status,
    }

    if (client.length < 3) {
      setError({
        client: "invalid name"
      })
    } else if (contact.length != 10) {
      setError({
        contact: "it must be of 10 digit"
      })
    } else if (province.length === 0) {
      setError({
        province: "plz select province"
      })
    } else if (district.length === 3) {
      setError({
        district: "plz select district"
      })
    } else if (city.length === 0) {
      setError({
        city: "enter city"
      })
    } else if (futsalname.length < 3) {
      setError({
        company: "invalid city"
      })
    } else if (booktime === '') {
      setError({
        booktime: 'plz select time',
      });
    } else if (ground.length === 0) {
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
      fetch('http://localhost:8001/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      }).then(() => {
        alert('sucessfully submitted..'),
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
            <CFormSelect
              id="inputState"
              label="Province:"
              value={province}
              onChange={(e) => setProvince(e.target.value)}>
              <option value="Bagmati">Bagmati</option>
              <option value="Lumbini">Lumbini</option>
              <option value="Gandaki">Gandaki</option>
              <option value="Sudur_Pashchim">Sudur Pashchim</option>
              <option value="Karnali">Karnali</option>
              <option value="Madesh">Madesh</option>
              <option value="Province-No-1">Province No. 1</option>
            </CFormSelect>
            {error['province'] ?
              <label className="create-error">{error.province}</label> : ''
            }
          </CCol>

          <CCol xs={4}>
            <CFormSelect
              id="inputState"
              label="District:"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}>
              <option value="Achham">Achham</option>
              <option value="Arghakhanchi">Arghakhanchi</option>
              <option value="Baglung">Baglung</option>
              <option value="Baitadi">Baitadi</option>
              <option value="Bajhang">Bajhang</option>
              <option value="Bajura">Bajura</option>
              <option value="Banke">Banke</option>
              <option value="Bara">Bara</option>
              <option value="Bardiya">Bardiya</option>
              <option value="Bhaktapur">Bhaktapur</option>
              <option value="Bhojpur">Bhojpur</option>
              <option value="Chitwan">Chitwan</option>
              <option value="Dadeldhura">Dadeldhura</option>
              <option value="Dailekh">Dailekh</option>
              <option value="Dang">Dang</option>
              <option value="Darchula">Darchula</option>
              <option value="Dhading">Dhading</option>
              <option value="Dhankuta">Dhankuta</option>
              <option value="Dhanusha">Dhanusha</option>
              <option value="Dolakha">Dolakha</option>
              <option value="Dolpa">Dolpa</option>
              <option value="Doti">Doti</option>
              <option value="Gorkha">Gorkha</option>
              <option value="Gulmi">Gulmi</option>
              <option value="Humla">Humla</option>
              <option value="Ilam">Ilam</option>
              <option value="Jajarkot">Jajarkot</option>
              <option value="Jhapa">Jhapa</option>
              <option value="Jumla">Jumla</option>
              <option value="Kailali">Kailali</option>
              <option value="Kalikot">Kalikot</option>
              <option value="Kanchanpur">Kanchanpur</option>
              <option value="Kapilvastu">Kapilvastu</option>
              <option value="Kaski">Kaski</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Kavrepalanchok">Kavrepalanchok</option>
              <option value="Khotang">Khotang</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Lamjung">Lamjung</option>
              <option value="Mahottari">Mahottari</option>
              <option value="Makwanpur">Makwanpur</option>
              <option value="Manang">Manang</option>
              <option value="Morang">Morang</option>
              <option value="Mugu">Mugu</option>
              <option value="Mustang">Mustang</option>
              <option value="Myagdi">Myagdi</option>
              <option value="Nawalparasi">Nawalparasi</option>
            </CFormSelect>
            {error['district'] ?
              <label className="create-error">{error.district}</label> : ''
            }
          </CCol>

          <CCol md={4}>
            <CFormInput
              id="inputCity"
              label="City:"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {error['city'] ?
              <label className="create-error">{error.city}</label> : ''
            }
          </CCol>
          <CCol xs={4}>
            <CFormInput
              id="Futsalname"
              label="Futsal Name:"
              placeholder="Futsal Name"
              value={futsalname}
              onChange={(e) => setFutsalname(e.target.value)}
            />
            {error.company ?
              <label className="create-error">{error.company}</label> : ''
            }
          </CCol>
          <CCol xs={4}>
            <CFormInput
              label="Booking Time:"
              type="time"
              id="bookime"
              value={booktime}
              onChange={handleBookTime}
            />
            {error['booktime'] ?
              <label className="create-error">{error.booktime}</label> : ''
            }
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
  )
}
export default BookingForm
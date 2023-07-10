import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CCard } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { addFusal } from 'src/util/apiroutes'
import SelectedProvince from '../components/SelectProvince'
import SelectedDistrict from '../components/SelectDistrict'
import SelectedCity from '../components/SelectCity'


const FutsalCreate = () => {
  const [futsal, setFutsal] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('')
  const [street, setStreet] = useState('')
  const [pan, setPan] = useState('')
  const [file, setFile] = useState('')
  const [status, setStatus] = useState('')
  const [openingTime, setOpeningTime] = useState('')
  const [closingTime, setClosingTime] = useState('')
  const [ground, setGround] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [error, setError] = useState([])
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
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return new Date().setHours(hours, minutes, 0, 0);
  };

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    let start = new Date(startTime);
    while (start < endTime) {
      const slotStart = formatTime(start);
      start.setHours(start.getHours() + 1);
      const slotEnd = formatTime(start);
      slots.push(`${slotStart}-${slotEnd}`);
    }

    return slots;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (futsal.length < 3) {
      setError({
        futsal: "invalid name"
      })
    } else if (owner.length < 3) {
      setError({
        owner: "must be more than 3"
      })
    } else if (!validateEmail(email)) {
      setError({
        email: "invalid email"
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
        city: "invalid city"
      })
    } else if (street.length < 3) {
      setError({
        street: "invalid street"
      })
    } else if (pan.length < 5) {
      setError({
        pan: "invalid pan"
      })
    } else if (file === "") {
      setError({
        file: "invalid file"
      })
    } else if (openingTime === '') {
      setError({
        openingTime: 'plz select',
      });
    } else if (closingTime === "") {
      setError({
        closingTime: 'plz select '
      })
    } else if (ground.length === 0) {
      setError({
        ground: "invalid ground"
      })
    } else if (status == '') {
      setError({
        status: "plz select"
      })
    } else if (ground.length === '') {
      setError({
        ground: "plz enter number of ground"
      })
    } else {
      const detail = {
        futsal,
        owner,
        email,
        contact,
        province: selectedProvince,
        district: selectedDistrict,
        city: selectedCity,
        street,
        pan,
        file,
        openingTime,
        closingTime,
        ground,
        status,
        timeSlots,
      }
      // Generate time slots
      const startTime = parseTime(openingTime);
      const endTime = parseTime(closingTime);
      const slots = generateTimeSlots(startTime, endTime);
      // Assign time slots to detail object
      const updatedDetail = {
        ...detail,
        timeSlots: slots,
      };
      setTimeSlots(slots);

      fetch(`${addFusal}/details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDetail),
      }).then(() => {
        navigate('/futsals')

      })
    }
  }
  return (
    <div>
      <CCard style={{ padding: '3rem' }}>
        <CForm className="row g-3" onSubmit={handleSubmit} method="POST">
          <CCol xs={6}>
            <CFormInput
              name="futsal"
              id="futsal"
              label="Futsal Name:"
              placeholder="Futsal Name"
              value={futsal}
              onChange={(e) => setFutsal(e.target.value)}
            />
            {error.futsal ?
              <label className="create-error">{error.futsal}</label> : ''
            }
          </CCol>

          <CCol xs={6}>
            <CFormInput
              id="owner"
              name="owner"
              label="Owner Name:"
              placeholder="Futsal Owner Name"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
            {error['owner'] ?
              <label className="create-error">{error.owner}</label> : ''
            }
          </CCol>

          <CCol md={4}>
            <CFormInput
              name="email"
              type="email"
              id="email"
              label="Email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error['email'] ?
              <label className="create-error">{error.email}</label> : ''}
          </CCol>
          <CCol md={4}>
            <CFormInput
              name="contact"
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
            <CFormInput
              name="street"
              id="street"
              label="Street:"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            {error['street'] ?
              <label className="create-error">{error.street}</label> : ''
            }
          </CCol>
          <CCol md={3}>
            <CFormInput
              name="pan"
              id="pan"
              label="Pan Number:"
              value={pan}
              onChange={(e) => setPan(e.target.value)}
            />
            {error['pan'] ?
              <label className="create-error">{error.pan}</label> : ''
            }
          </CCol>
          <CCol md={3}>
            <CFormInput
              name="file"
              type="file"
              id="file"
              aria-label="file example"
              value={file}
              label="Upload Ground Pic:"
              onChange={(e) => setFile(e.target.value)}
            />
            {error['file'] ?
              <label className="create-error">{error.file}</label> : ''
            }
          </CCol>

          <CCol xs={2}>
            <CFormInput
              name="openingTime"
              label="Opening Time:"
              type="time"
              id="openingTime"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
            />
            {error['openingTime'] ?
              <label className="create-error">{error.openingTime}</label> : ''
            }
          </CCol>
          <CCol xs={2}>
            <CFormInput
              name="closingTime"
              label="Closing Time:"
              type="time"
              id="closingTime"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
            />
            {error['closingTime'] ?
              <label className="create-error">{error.closingTime}</label> : ''
            }
          </CCol>
          <CCol md={2}>
            <CFormInput
              name="ground"
              type="number"
              id="ground"
              label="No. of Grounds:"
              value={ground}
              onChange={(e) => setGround(e.target.value)}
            />
            {error.ground ?
              <label className="create-error">{error.ground}</label> : ''
            }
          </CCol>
          <CCol xs={3}>
            <label>Status:</label> <br></br>
            <CFormCheck
              button={{ color: 'success', variant: 'outline' }}
              type="radio"
              name="status"
              id="status"
              label="Active"
              value={1}
              checked={status == 1}
              onChange={(e) => setStatus(e.target.value)}
            />
            <CFormCheck
              button={{ color: 'danger', variant: 'outline' }}
              type="radio"
              name="status"
              id="status"
              label="Inactive"
              value={0}
              checked={status == 0}
              onChange={(e) => setStatus(e.target.value)}
            /><br></br>
            {error['status'] ?
              <label className="create-error">{error.status}</label> : ''
            }
          </CCol>
          <CCol xs={12}>
            <CButton type="submit">Create</CButton>
          </CCol>
        </CForm>
      </CCard>
    </div>
  )
}
export default FutsalCreate;
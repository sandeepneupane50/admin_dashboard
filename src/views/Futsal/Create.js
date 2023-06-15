import React, { useState, useEffect } from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCard } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { addFusal, locationUrl } from 'src/util/apiroutes'


const FutsalCreate = () => {
  const [futsal, setFutsal] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [street, setStreet] = useState('')
  const [pan, setPan] = useState('')
  const [file, setFile] = useState('')
  const [status, setStatus] = useState('')
  const [openingTime, setOpeningTime] = useState('')
  const [closingTime, setClosingTime] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [ground, setGround] = useState('')

  const [error, setError] = useState([])
  const navigate = useNavigate()

  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${locationUrl}/provinces`);
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchDistricts = async () => {
    try {
      const response = await fetch(`${locationUrl}/districts?provinceId=${selectedProvince}`);
      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`${locationUrl}/cities?districtId=${selectedDistrict}`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  }


  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);
  };

  // options location
  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    fetchCities();
  }, [selectedDistrict]);


  const onOptionChange = e => {
    setStatus(e.target.value)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOpeningTimeChange = (e) => {
    setOpeningTime(e.target.value);
  };

  const handleClosingTimeChange = (e) => {
    setClosingTime(e.target.value);
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
    event.preventDefault()
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
      }).then((response) => {
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
              id="Futsal"
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
              id="Owner"
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
              type="email"
              id="inputEmail4"
              label="Email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error['email'] ?
              <label className="create-error">{error.email}</label> : ''}
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
              id="province"
              label="Province:"
              value={selectedProvince}
              onChange={handleProvinceChange}>
              <option value="">select province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </CFormSelect>
            {error['province'] ?
              <label className="create-error">{error.province}</label> : ''
            }
          </CCol>

          <CCol xs={4}>
            <CFormSelect
              id="district"
              label="District:"
              value={selectedDistrict}
              onChange={handleDistrictChange}>
              <option value="">select district</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}

            </CFormSelect>
            {error['district'] ?
              <label className="create-error">{error.district}</label> : ''
            }
          </CCol>

          <CCol md={4}>
            <CFormSelect
              id="city"
              label="City:"
              value={selectedCity}
              onChange={handleCityChange}>
              <option value="">select city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </CFormSelect>
            {error['city'] ?
              <label className="create-error">{error.city}</label> : ''
            }
          </CCol>
          <CCol md={4}>
            <CFormInput
              id="inputStreet"
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
              id="inputNumber"
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
              type="file"
              id="validationTextarea"
              feedbackInvalid="Example invalid form file feedback"
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
              label="Opening Time:"
              type="time"
              id="openingTime"
              value={openingTime}
              onChange={handleOpeningTimeChange}
            />
            {error['openingTime'] ?
              <label className="create-error">{error.openingTime}</label> : ''
            }
          </CCol>
          <CCol xs={2}>
            <CFormInput
              label="Closing Time:"
              type="time"
              id="closingTime"
              value={closingTime}
              onChange={handleClosingTimeChange}
            />
            {error['closingTime'] ?
              <label className="create-error">{error.closingTime}</label> : ''
            }
          </CCol>
          <CCol md={2}>
            <CFormInput
              type="number"
              id="inputGround"
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
              id="success-outlined"
              label="Active"
              value={1}
              checked={status == 1}
              onChange={onOptionChange}
            />
            <CFormCheck
              button={{ color: 'danger', variant: 'outline' }}
              type="radio"
              name="status"
              id="danger-outlined"
              label="Inactive"
              value={0}
              checked={status == 0}
              onChange={onOptionChange}
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
export default FutsalCreate

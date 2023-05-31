import React, { useState, useEffect } from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCard } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { addfusal, locationurl } from 'src/util/apiroutes'


const FutsalCreate = () => {
  const [company, setCompany] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [pan, setPan] = useState('')
  const [file, setFile] = useState('')
  const [status, setStatus] = useState('')
  const [openingTime, setOpeningTime] = useState('')
  const [ground, setGround] = useState('')
  const [closingTime, setClosingTime] = useState('')
  const [error, setError] = useState([])
  const navigate = useNavigate()
  
  

  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${locationurl}/provinces`);
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await fetch(`${locationurl}/districts?provinceId=${provinceId}`);
      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };
  
  

  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    setSelectedProvince(selectedProvinceId);
    setSelectedDistrict('');

    if (selectedProvinceId) {
      fetchDistricts(selectedProvinceId);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);
  };

  const onOptionChange = e => {
    setStatus(e.target.value)
    console.log(status)
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


  const handleSubmit = (event) => {
    event.preventDefault()
    const detail = {
      company,
      owner,
      email,
      contact,
      province: selectedProvince,
      district: selectedDistrict,
      city,
      street,
      pan,
      file,
      openingTime,
      closingTime,
      ground,
      status,
    }

    if (company.length < 3) {
      setError({
        company: "invalid name"
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
    } else if (city.length < 3) {
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
    } else if ( file === "") {
      setError({
        file: "invalid file"
      })
    } else if (ground.length === 0) {
      setError({
        ground: "invalid ground"
      })
    } else if (status == '') {
      setError({
        status: "plz select"
      })
    } else if (openingTime === '' || closingTime === '') {
      setError({
        openingTime: 'Opening and closing time cannot be empty',
        closingTime: 'Opening and closing time cannot be empty'
      });
    } else if (ground.length === '') {
      setError({
        ground: "plz enter number of ground"
      })
    } else {
      console.log(detail)
      fetch(`${addfusal}/details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detail),
      }).then(() => {
        alert('sucessfully submitted..'),
          navigate('/futsals')
      })
    }
  }

  // options location
  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <div>
      <CCard style={{ padding: '3rem' }}>
        <CForm className="row g-3" onSubmit={handleSubmit} method="POST">
          <CCol xs={6}>
            <CFormInput
              id="Company"
              label="Company Name:"
              placeholder="Futsal Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            {error.company ?
              <label className="create-error">{error.company}</label> : ''
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

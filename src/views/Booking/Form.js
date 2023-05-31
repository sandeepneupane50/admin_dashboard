import React, { useState, useEffect } from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCard } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { bookfutsal, locationurl, addfusal } from 'src/util/apiroutes'


const BookingForm = () => {
  const [client, setClient] = useState('')
  const [contact, setContact] = useState('')
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [futsals, setFutsals] = useState([]);
  const [selectedFutsal, setSelectedFutsal] = useState('');
  const [booktime, setBooktime] = useState('')
  const [status, setStatus] = useState('')
  const [ground, setGround] = useState('')
  const [paymentmethod, setPaymentmethod] = useState('')
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

  const fetchCities = async (districtId) => {
    try {
      const response = await fetch(`${locationurl}/cities?districtId=${districtId}`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  }

  const fetchFutsals = async (cityId) => {
    try {
      const response = await fetch(`http://localhost:8000/details?city=${cityId}`);
      const data = await response.json();
      const companyNames = data.map((futsal) => ({ id : futsal.id, name : futsal.company}));
      setFutsals(companyNames);
    } catch (error) {
      console.error('Error fetching futsals:', error);
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
    setSelectedCity('');

    if (selectedDistrictId) {
      fetchCities(selectedDistrictId);
    }
  };

  const handleCityChange = (event) => {
    const selectedCityId = event.target.value;
    setSelectedCity(selectedCityId);
    setSelectedFutsal('');

    if (selectedCityId) {
      fetchFutsals(selectedCityId);
    }
  };

  const handleFutsalChange = (event) => {
    const selectedFutsalName = event.target.value;
    setSelectedFutsal(selectedFutsalName);
  };

  


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
      province: selectedProvince,
      district: selectedDistrict,
      city: selectedCity,
      futsalname: selectedFutsal,
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
      fetch(`${bookfutsal}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      }).then(() => {
        alert('sucessfully submitted..')
          navigate('/bookings')
      })
    }
  }

   // options location
   useEffect(() => {
    fetchProvinces();
    fetchDistricts();
    fetchCities();
  }, []);


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
          <CFormSelect
              id="futsal"
              label="Futsal:"
              value={selectedFutsal}
              onChange={handleFutsalChange}>
              <option value="">select futsal</option>
              {futsals.map((futsal) => (
                <option key={futsal.id} value={futsal.id}>
                  {futsal.name}
                </option>
              ))}
            </CFormSelect>
            {error['futsal'] ?
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
  )
}
export default BookingForm
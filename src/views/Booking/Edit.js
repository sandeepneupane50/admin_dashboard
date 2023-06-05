import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CCard
} from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookfutsal, locationurl } from 'src/util/apiroutes';

const BookingEdit = () => {
  const [client, setClient] = useState('');
  const [contact, setContact] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [futsalname, setFutsalname] = useState('');
  const [bookdate, setBookdate] = useState('');
  const [status, setStatus] = useState('');
  const [ground, setGround] = useState('');
  const [paymentmethod, setPaymentmethod] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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
      console.error('Error fetching cities:', error);
    }
  };

  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    setSelectedProvince(selectedProvinceId);
    setSelectedDistrict('');
    setSelectedCity('');

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
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);
  };

  const onOptionChange = e => {
    setStatus(e.target.value)
  }

  const handleBookDate = (e) => {
    setBookdate(e.target.value);
  };

  useEffect(() => {
    fetchProvinces();
    fetchDistricts(selectedProvince);
    fetchCities(selectedDistrict);
  }, []);

  useEffect(() => {
    fetch(`${bookfutsal}/books?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const book = data[0];
          setClient(book.client);
          setContact(book.contact);
          setSelectedProvince(book.province);
          setSelectedDistrict(book.district);
          setSelectedCity(book.city);
          setFutsalname(book.futsalname);
          setBookdate(book.bookdate);
          setStatus(book.status);
          setGround(book.ground);
          setPaymentmethod(book.paymentmethod);
        }
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "client":
        setClient(value);
        break;
      case "contact":
        setContact(value)
        break;
      case "province":
        setSelectedProvince(value);
        break;
      case "district":
        setSelectedDistrict(value);
        break;
      case "city":
        setSelectedCity(value);
        break;
      case "futsalname":
        setFutsalname(value);
        break;
      case "bookdate":
        setBookdate(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "ground":
        setGround(value);
        break;
      case "paymentmethod":
        setPaymentmethod(value);
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookData = {
      client,
      contact,
      province: selectedProvince,
      district: selectedDistrict,
      city: selectedCity,
      futsalname,
      bookdate,
      status,
      ground,
      paymentmethod
    };

    try {
      const response = await fetch(`${bookfutsal}/books/${id}`, {
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
  };




  return (
    <>
      <div>
        <CCard style={{ padding: '3rem' }}>
          <CForm className="row g-3" onSubmit={handleSubmit} method="POST">
            <CCol xs={4}>
              <CFormInput
                name="client"
                id="Client"
                label="Team/Client Name:"
                placeholder="Team/Client Name"
                value={client}
                onChange={handleChange}
              />
              {error.client ?
                <label className="create-error">{error.client}</label> : ''
              }
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                name="contact"
                id="inputContact"
                label="Contact no:"
                value={contact}
                onChange={handleChange}
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
            <CCol xs={4}>
              <CFormInput
                id="Futsalname"
                label="Futsal Name:"
                name="futsalname"
                placeholder="Futsal Name"
                value={futsalname}
                onChange={handleChange}
              />
              {error.company ?
                <label className="create-error">{error.company}</label> : ''
              }
            </CCol>
            <CCol xs={4}>
              <CFormInput
                label="Booking Date:"
                type="date"
                id="bookdate"
                name="bookdate"
                value={bookdate}
                onChange={handleBookDate}
              />
              {error['bookdate'] ?
                <label className="create-error">{error.bookdate}</label> : ''
              }
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                id="inputGround"
                label="Ground:"
                name="ground"
                value={ground}
                onChange={handleChange}
              />
              {error.ground ?
                <label className="create-error">{error.ground}</label> : ''
              }
            </CCol>
            <CCol xs={4}>
              <CFormSelect
                id="inputPayment"
                label="Payment Method:"
                name="paymentmethod"
                value={paymentmethod}
                onChange={handleChange}>
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
import React, { useState, useEffect } from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCard } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { bookfutsal, locationurl } from 'src/util/apiroutes'

const BookingEdit = () => {
  const [client, setClient] = useState('')
  const [contact, setContact] = useState('')
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [city, setCity] = useState('')
  const [futsalname, setFutsalname] = useState('')
  const [booktime, setBooktime] = useState('')
  const [status, setStatus] = useState('')
  const [ground, setGround] = useState('')
  const [paymentmethod, setPaymentmethod] = useState('')
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${locationurl}/provinces`);
      const data = await response.json();
      setProvinces(data);
      // setLoadedProvinces(true);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };
  
  
    const fetchDistricts = async (provinceId) => {
      try {
        const response = await fetch(`${locationurl}/districts?provinceId=${provinceId}`);
        const data = await response.json();
        setDistricts(data);
        setSelectedDistrict(selectedDistrictId);
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

  const handleBookTime = (e) => {
    setBooktime(e.target.value);
  };

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
        setCity(value);
        break;
      case "futsalname":
        setFutsalname(value);
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
  // options location
    useEffect(() => {
      fetchProvinces()
      if (selectedProvince) {
        fetchDistricts(selectedProvince);
      } else {
        setDistricts([]);
      }
    }, [selectedProvince]);
  // handle submit

  const handleSubmit = (event) => {
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
    } else if (city.length === 0) {
      setError({
        city: "enter city"
      })
    } else if (futsalname.length < 3) {
      setError({
        futsalname: "invalid city"
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
      const updatedData = {
        client,
        contact,
        province: selectedProvince,
        district: selectedDistrict,
        city,
        futsalname,
        booktime,
        ground,
        paymentmethod,
        status,
      };

      fetch(`${bookfutsal}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })
        .then(() => {
          alert("Successfully updated..");
          navigate("/bookings");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const { id } = useParams();
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
          setCity(book.city);
          setFutsalname(book.futsalname);
          setBooktime(book.booktime);
          setGround(book.ground);
          setPaymentmethod(book.paymentmethod);
          setStatus(book.status);
          setData(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);




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
              <CFormInput
                id="City"
                label="City Name:"
                name="city"
                placeholder="City Name"
                value={city}
                onChange={handleChange}
              />
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
                label="Booking Time:"
                type="time"
                id="bookime"
                name="booktime"
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
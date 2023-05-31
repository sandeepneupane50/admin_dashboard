// new code

import React, { useState, useEffect } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CCard,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";

import { addfusal, locationurl } from "src/util/apiroutes";



const FutsalUpdate = () => {

  const [company, setCompany] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [street, setStreet] = useState("");
  const [pan, setPan] = useState("");
  const [file, setFile] = useState("");
  const [openingTime, setOpeningTime] = useState('')
  const [closingTime, setClosingTime] = useState('')
  const [ground, setGround] = useState('')
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const onOptionChange = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleOpeningTimeChange = (e) => {
    setOpeningTime(e.target.value);
  };

  const handleClosingTimeChange = (e) => {
    setClosingTime(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);
  };



      // options location
      useEffect(() => {
        fetchProvinces();
        if (selectedProvince) {
          fetchDistricts(selectedProvince);
        }
        if (selectedDistrict) {
          fetchCities(selectedDistrict);
        } else {
          setCities([]);
        }
      }, [selectedProvince, selectedDistrict]);
  



  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "company":
        setCompany(value);
        break;
      case "owner":
        setOwner(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "contact":
        setContact(value);
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
      case "street":
        setStreet(value);
        break;
      case "pan":
        setPan(value);
        break;
      case "file":
        setFile(value);
        break;
      case "openingTime":
        setOpeningTime(value);
        break;
      case "closingTime":
        setClosingTime(value);
        break;
      case "ground":
        setGround(value);
        break;
      case "status":
        setStatus(value);
        break;  
      default:
        break;
    }
  };


    

  const handleSubmit = (event) => {
    event.preventDefault();

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
    }  else if ( file === "") {
      setError({
        file: "invalid file"
      })
    } else if (ground.length === 0 ) {
      setError({
        ground: "invalid ground"
      })
    } else if (status == '') {
      setError({
        status: "plz select"
      })
    } else if (openingTime === '') {
      setError({
        openingTime: 'plz select',
      });
    } else if ( closingTime === "") {
      setError({
        closingTime: 'plz select '
      })
    }  else if (ground.length === '') {
      setError({
        ground: "plz enter number of ground"
      })
    } else {
      const updatedData = {
        company,
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
      };

      fetch(`${addfusal}/details/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })
        .then(() => {
          alert("Successfully updated..");
          navigate("/futsals");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const { id } = useParams();
  useEffect(() => {
    fetch(`${addfusal}/details?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const detail = data[0];
          setCompany(detail.company);
          setOwner(detail.owner);
          setEmail(detail.email);
          setContact(detail.contact);
          setSelectedProvince(detail.province);
          setSelectedDistrict(detail.district);
          setSelectedCity(detail.city);
          setStreet(detail.street);
          setPan(detail.pan);
          setFile(detail.file);
          setOpeningTime(detail.openingTime);
          setClosingTime(detail.closingTime);
          setGround(detail.ground);
          setStatus(detail.status);
          setData(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  return (
    <div>
      <CCard style={{ padding: '3rem' }}>
        <CForm className="row g-3" onSubmit={handleSubmit} method="UPDATE">
          <CCol xs={6}>
            <CFormInput
              id="Name"
              label="Company Name:"
              placeholder="Futsal Company Name"
              value={company}
              name="company"
              onChange={handleChange}

            />
             {error.company ?
              <label className="create-error">{error.company}</label> : ''
            }
          </CCol>

          <CCol xs={6}>
            <CFormInput
              id="Name"
              label="Owner Name:"
              placeholder="Futsal Owner Name"
              value={owner}
              name="owner"
              onChange={handleChange}
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
              onChange={handleChange}
              name="email"
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
              onChange={handleChange}
              name="contact"
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
              onChange={handleChange}
              name="street"
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
              onChange={handleChange}
              name="pan"
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
              label="Upload Ground Pic:"
              onChange={handleFileChange}
              name="file"
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
              onChange={handleChange}
            />
            <CFormCheck
              button={{ color: 'danger', variant: 'outline' }}
              type="radio"
              name="status"
              id="danger-outlined"
              label="Inactive"
              value={0}
              checked={status == 0}
              onChange={handleChange}
            /><br></br>
            {error['status'] ?
              <label className="create-error">{error.status}</label> : ''
            }
          </CCol>
          <CCol xs={12}>
            <CButton type="submit">Update</CButton>
          </CCol>
        </CForm>
      </CCard>
    </div>
  )
}
export default FutsalUpdate
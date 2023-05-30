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



const FutsalUpdate = () => {

  const [company, setCompany] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
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
    setSelectedFile(file);
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
        setProvince(value);
        break;
      case "district":
        setDistrict(value);
        break;
      case "city":
        setCity(value);
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
    } else if (!validateEmail === email) {
      setError({
        email: "invalid email"
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
    } else if (ground.length === 0 ) {
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
      const updatedData = {
        company,
        owner,
        email,
        contact,
        province,
        district,
        city,
        street,
        pan,
        file,
        openingTime,
        closingTime,
        ground,
        status,
      };

      fetch(`http://localhost:8000/details/${id}`, {
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
    fetch(`http://localhost:8000/details?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const detail = data[0];
          setCompany(detail.company);
          setOwner(detail.owner);
          setEmail(detail.email);
          setContact(detail.contact);
          setProvince(detail.province);
          setDistrict(detail.district);
          setCity(detail.city);
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
              id="inputState"
              label="Province:"
              value={province}
              onChange={handleChange}
              name="province">
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
              onChange={handleChange}
              name="district">
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
              onChange={handleChange}
              name="city"
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
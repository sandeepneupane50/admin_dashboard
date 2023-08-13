import React, { useState, useEffect } from "react";
import { CButton, CCol, CForm, CFormCheck, CFormInput, CCard } from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import { addFusal } from 'src/util/apiroutes'
import SelectedProvince from '../components/SelectProvince'
import SelectedDistrict from '../components/SelectDistrict'
import SelectedCity from '../components/SelectCity'
import axios from "axios";


const FutsalUpdate = () => {
  const [futsalname, setFutsalName] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('')
  const [street, setStreet] = useState('')
  const [pan, setPan] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')
  const [openingTime, setOpeningTime] = useState('')
  const [closingTime, setClosingTime] = useState('')
  const [ground, setGround] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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

  // timeslots
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

  const { id } = useParams();
  useEffect(() => {
    fetch(`${addFusal}/futsals?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const detail = data.find(detail => detail._id === id);
          setFutsalName(detail.futsalname);
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
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (futsalname.length < 3) {
      setError({
        futsalname: "invalid name"
      })
    } else if (owner.length < 3) {
      setError({
        owner: "must be more than 3"
      })
    } else if (!validateEmail(email)) {
      setError({
        email: "invalid email"
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
    } else if (ground.length === 0) {
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
    } else if (closingTime === "") {
      setError({
        closingTime: 'plz select '
      })
    } else if (ground.length === '') {
      setError({
        ground: "plz enter number of ground"
      })
    } else {
      const details = {
        futsalname,
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
      };
      // Generate time slots
      const startTime = parseTime(openingTime);
      const endTime = parseTime(closingTime);
      const slots = generateTimeSlots(startTime, endTime);
      // Assign time slots to detail object
      const updatedDetail = {
        ...details,
        timeSlots: slots,
      };
      setTimeSlots(slots);

      try{
        const response = await axios.patch(`${addFusal}/futsals/${id}`, {
          ...updatedDetail
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          navigate('/futsals')
        })
          .then(() => {
            alert("Successfully updated..");
            navigate("/futsals");
          })
      } catch(error) {
          console.error("Error:", error);
        };
    }
  };
  return (
    <div>
      <CCard style={{ padding: '3rem' }}>
        <CForm className="row g-3" onSubmit={handleSubmit} method="UPDATE">
          <CCol xs={6}>
            <CFormInput
              id="futsalname"
              label="Futsal Name:"
              placeholder="Futsal Name"
              value={futsalname}
              name="futsalname"
              onChange={(e) => setFutsalName(e.target.value)}

            />
            {error.futsalname ?
              <label className="create-error">{error.futsalname}</label> : ''
            }
          </CCol>

          <CCol xs={6}>
            <CFormInput
              id="owner"
              label="Owner Name:"
              placeholder="Futsal Owner Name"
              value={owner}
              name="owner"
              onChange={(e) => setOwner(e.target.value)}
            />
            {error['owner'] ?
              <label className="create-error">{error.owner}</label> : ''
            }
          </CCol>

          <CCol md={4}>
            <CFormInput
              type="email"
              id="email"
              label="Email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            {error['email'] ?
              <label className="create-error">{error.email}</label> : ''}
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="number"
              id="contact"
              label="Contact no:"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              name="contact"
            />
            {error.contact ?
              <label className="create-error">{error.contact}</label> : ''
            }
          </CCol>
          <CCol xs={4}>
            <SelectedProvince onChange={getProvince} selectedProvince={selectedProvince} />
            {error['province'] ?
              <label className="create-error">{error.province}</label> : ''
            }
          </CCol>

          <CCol xs={4}>
            <SelectedDistrict onChange={getDistrict} selectedProvince={selectedProvince} selectedDistrict={selectedDistrict}/>
            {error['district'] ?
              <label className="create-error">{error.district}</label> : ''
            }
          </CCol>
          <CCol md={4}>
            <SelectedCity onChange={getCity} selectedDistrict={selectedDistrict} selectedCity={selectedCity} />
            {error['city'] ?
              <label className="create-error">{error.city}</label> : ''
            }
          </CCol>
          <CCol md={4}>
            <CFormInput
              id="street"
              label="Street:"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              name="street"
            />
            {error['street'] ?
              <label className="create-error">{error.street}</label> : ''
            }
          </CCol>
          <CCol md={3}>
            <CFormInput
              id="pan"
              label="Pan Number:"
              value={pan}
              onChange={(e) => setPan(e.target.value)}
              name="pan"
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
               label="Upload Ground Pic:"
               onChange={(e) => setFile(e.target.files[0])}
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
              onChange={(e) => setOpeningTime(e.target.value)}
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
              onChange={(e) => setClosingTime(e.target.value)}
            />
            {error['closingTime'] ?
              <label className="create-error">{error.closingTime}</label> : ''
            }
          </CCol>

          <CCol md={2}>
            <CFormInput
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
              id="status1"
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
            <CButton type="submit">Update</CButton>
          </CCol>
        </CForm>
      </CCard>
    </div>
  )
}
export default FutsalUpdate;
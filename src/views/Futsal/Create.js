import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCard } from '@coreui/react'
import { useNavigate } from 'react-router-dom'


const FutsalCreate = () => {
  const [company, setCompany] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [pan, setPan] = useState('')
  const [file, setFile] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const onOptionChange = e => {
    setStatus(e.target.value)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const detail = {
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
      status,
    }



    console.log(detail)

    if (
      company.length < 0 ||
      owner.length < 0 ||
      email.length === 0 ||
      contact.length === 0 ||
      province.length === 0 ||
      district.length === 0 ||
      city.length === 0 ||
      street.length === 0 ||
      pan.length === 0
    ) {
      setError(true)
    } else {
      fetch('http://localhost:8000/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detail),
      }).then(() => {
        alert('sucessfully submitted..'),
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
            id="Name"
            label="Company Name:"
            placeholder="Futsal Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {error && company.length < 3 ?
            <label className="create-error">it can't be less than 3 letter</label> : ''
          }
        </CCol>

        <CCol xs={6}>
          <CFormInput
            id="Name"
            label="Owner Name:"
            placeholder="Futsal Owner Name"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          {error && company.length < 3 ?
            <label className="create-error">it can't be less than 3 letter</label> : ''
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
          {error && !validateEmail(email) && <label className="create-error">Invalid email address</label>}
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="number"
            id="inputContact"
            label="Contact no:"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {error && contact.length < 10 || contact.length > 10 ?
            <label className="create-error">invalid contact number</label> : ''
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
          {error && province.length === 0 ?
            <label className="create-error">invalid province</label> : ''
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
          {error && district.length === 0 ?
            <label className="create-error">invalid district</label> : ''
          }
        </CCol>

        <CCol md={4}>
          <CFormInput
            id="inputCity"
            label="City:"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {error && city.length < 5 ?
            <label className="create-error">invalid city</label> : ''
          }
        </CCol>
        <CCol md={4}>
          <CFormInput
            id="inputStreet"
            label="Street:"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          {error && street.length < 5 ?
            <label className="create-error">invalid street</label> : ''
          }
        </CCol>
        <CCol md={4}>
          <CFormInput
            id="inputNumber"
            label="Pan Number:"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
          />
          {error && pan.length < 5 ?
            <label className="create-error">invalid Zip</label> : ''
          }
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="file"
            id="validationTextarea"
            feedbackInvalid="Example invalid form file feedback"
            aria-label="file example"
            value={file}
            required
            label= "Upload Ground Pic:"
            onChange={(e) => setFile(e.target.value)}
          />
          {error && file === "" ?
            <label className="create-error">invalid file</label> : ''
          }
        </CCol>
        <CCol xs={6}>
          <label>Status:</label> <br></br>
          <CFormCheck
            button={{ color: 'success', variant: 'outline' }}
            type="radio"
            name="status"
            id="success-outlined"
            label="Active"
            value="active"
            checked={status === "active"}
            onChange={onOptionChange}
          />
          <CFormCheck
            button={{ color: 'danger', variant: 'outline' }}
            type="radio"
            name="status"
            id="danger-outlined"
            label="Inactive"
            value="inactive"
            checked={status === "inactive"}
            onChange={onOptionChange}
          />
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

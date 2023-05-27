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
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !validateEmail(email) ||
      company.length < 3 ||
      owner.length < 3 ||
      email.length === 0 ||
      contact.length < 10 ||
      province.length === 0 ||
      district.length === 0 ||
      city.length < 1 ||
      street.length < 1 ||
      // file === "" ||
      pan.length < 5
    ) {
      setError(true);
    } else {
      fetch(`http://localhost:8000/details/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
          setStatus(detail.status);
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
            {error && company.length < 3 ? (
              <label className="create-error">it can't be less than 3 letter</label>
            ) : null
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
            {error && owner.length < 3 ? (
              <label className="create-error">it can't be less than 3 letter</label>
            ) : null
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
            {error && !validateEmail(email) ? (
              <label className="create-error">Invalid email address</label>
            ) : null}
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
            {error && contact.length < 10 || contact.length > 10 ? (
              <label className="create-error">invalid contact number</label>
            ) : null
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
            {error && province.length === 0 ? (
              <label className="create-error">invalid province</label>
            ) : null
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
            {error && district.length === 0 ? (
              <label className="create-error">invalid district</label>
            ) : null
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
            {error && city.length < 5 ? (
              <label className="create-error">invalid city</label>
            ) : null
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
            {error && street.length < 5 ? (
              <label className="create-error">invalid street</label>
            ) : null
            }
          </CCol>
          <CCol md={4}>
            <CFormInput
              id="inputNumber"
              label="Pan Number:"
              value={pan}
              onChange={handleChange}
              name="pan"
            />
            {error && pan.length < 5 ? (
              <label className="create-error">invalid Zip</label>
            ) : null
            }
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="file"
              id="validationTextarea"
              feedbackInvalid="Example invalid form file feedback"
              aria-label="file example"
              label="Upload Ground Pic:"
              onChange={handleFileChange}
              name="file"
            />
            {error && file === 0 ? (
              <label className="create-error">invalid file</label>
            ) : null
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
            {error && status.length === 0 ? (
              <label className="create-error">invalid status</label>
            ) : null
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
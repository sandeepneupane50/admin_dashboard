import { CFormSelect } from "@coreui/react";
import { useState, useEffect } from "react";
import { locationUrl } from "src/util/apiroutes";
import axios from "axios";

const SelectedCity = (props) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    const fetchCities = async () => {
        try {
          // Call your login API passing the username and password
          let response = await axios.get(`${locationUrl}/cities?district_id=${props.selectedDistrict}`)
  
          const cities = response.data;
        //   console.log(response);
          setCities(cities);
  
        } catch (error) {
          // Handle login errors here, e.g., display an error message
          console.error('Loading error:', error);
        }
        };
    useEffect(() => {
        fetchCities();
    }, [props.selectedDistrict]);

    useEffect(() => {
        props.onChange(selectedCity)
    }, [selectedCity])

    return (
        <CFormSelect
            name="selectedCity"
            id="city"
            label="City:"
            value={props.selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">select city</option>
            {cities.map((city) => (
                <option key={city._id} value={city._id}>
                    {city.name}
                </option>
            ))}
        </CFormSelect>
    );
}
export default SelectedCity;


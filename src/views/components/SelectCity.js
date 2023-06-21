import { CFormSelect } from "@coreui/react";
import { useState, useEffect } from "react";
import { locationUrl } from "src/util/apiroutes";

const SelectedCity = (props) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    const fetchCities = async () => {
        if (!props.selectedDistrict) {
            return; 
          }
        try {
            const response = await fetch(`${locationUrl}/cities?districtId=${props.selectedDistrict}`);
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    }
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
                <option key={city.id} value={city.id}>
                    {city.name}
                </option>
            ))}
        </CFormSelect>
    );
}


export default SelectedCity;


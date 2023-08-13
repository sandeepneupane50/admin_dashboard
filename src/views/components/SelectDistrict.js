import { CFormSelect } from "@coreui/react";
import { useState, useEffect } from "react";
import { locationUrl } from "src/util/apiroutes";
import axios from "axios";

const SelectedDistrict = (props) => {
    const[districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');


    const fetchDistricts = async () => {
      try {
        // Call your login API passing the username and password
        let response = await axios.get(`${locationUrl}/districts?province_id=${props.selectedProvince}`)
        const districts = response.data;
        setDistricts(districts);

      } catch (error) {
        // Handle login errors here, e.g., display an error message
        console.error('Loading error:', error);
      }
      };
    
      useEffect(() => {
        fetchDistricts();
      }, [props.selectedProvince]);

      useEffect(() => {
        props.onChange(selectedDistrict)
      }, [selectedDistrict]);
    
    return ( 
        <CFormSelect
              name="selectedDistrict"
              id="district"
              label="District:"
              value={props.selectedDistrict}
              onChange={(e)=> setSelectedDistrict(e.target.value)}>
              <option value="">select district</option>
              {districts.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.name}
                </option>
              ))}

            </CFormSelect>
     );
}
export default SelectedDistrict;
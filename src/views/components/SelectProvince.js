import { CFormSelect } from "@coreui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { locationUrl } from "src/util/apiroutes";


const SelectedProvince = (props) => {
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    
    const fetchProvinces = async () => {
      try {
        // Call your login API passing the username and password
        let response = await axios.get(`${locationUrl}/provinces`)
        const provinces = response.data;
        setProvinces(provinces);

      } catch (error) {
        // Handle login errors here, e.g., display an error message
        console.error('Loading error:', error);
      }
      };


      useEffect(() => {
        fetchProvinces();
      }, []);

      useEffect(() => {
        props.onChange(selectedProvince);
      }, [selectedProvince])

    return(
        <CFormSelect
              name="selectedprovince"
              id="province"
              label="Province:"
              value={props.selectedProvince}
              onChange={(e) =>setSelectedProvince(e.target.value)}>
              <option value="">select province</option>
              {provinces.map((province) => (
                <option key={province._id} value={province._id}>
                  {province.name}
                </option>
              ))}
            </CFormSelect>
    )
}
export default SelectedProvince;
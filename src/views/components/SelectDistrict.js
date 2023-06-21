import { CFormSelect } from "@coreui/react";
import { useState, useEffect } from "react";
import { locationUrl } from "src/util/apiroutes";

const SelectedDistrict = (props) => {
    const[districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const fetchDistricts = async () => {
      if (!props.selectedProvince) {
        return; 
      }
        try {
          const response = await fetch(`${locationUrl}/districts?provinceId=${props.selectedProvince}`);
          const data = await response.json();
          setDistricts(data);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };
    
      useEffect(() => {
        fetchDistricts();
      }, [props.selectedProvince]);

      useEffect(() => {
        props.onChange(selectedDistrict)
      }, [selectedDistrict])
    
    return ( 
        <CFormSelect
              name="selectedDistrict"
              id="district"
              label="District:"
              value={props.selectedDistrict}
              onChange={(e)=> setSelectedDistrict(e.target.value)}>
              <option value="">select district</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}

            </CFormSelect>
     );
}
 
export default SelectedDistrict;
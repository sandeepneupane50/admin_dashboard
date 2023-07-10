import { CFormSelect } from "@coreui/react";
import { useState, useEffect } from "react";
import { locationUrl } from "src/util/apiroutes";


const SelectedProvince = (props) => {
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    
    const fetchProvinces = async () => {
        try {
          const response = await fetch(`${locationUrl}/provinces`);
          const data = await response.json();
          setProvinces(data);
        } catch (error) {
          console.error('Error fetching provinces:', error);
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
              value={selectedProvince}
              onChange={(e) =>setSelectedProvince(e.target.value)}>
              <option value="">select province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </CFormSelect>
    )
}
export default SelectedProvince;
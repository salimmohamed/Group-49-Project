import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManufacturerTableRow = ({ manufacturer, fetchManufacturers }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/manufacturers/edit/" + manufacturer.ManufacturerID, { state: { manufacturer } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "manufacturers/" + manufacturer.ManufacturerID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Manufacturer deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting manufacturer");
      console.log(err);
    }
    fetchManufacturers();
  };

  return (
    <tr key={manufacturer.ManufacturerID}>
      <td>{manufacturer.ManufacturerID}</td>
      <td>{manufacturer.Name}</td>
      <td>{manufacturer.ContactEmail || ""}</td>
      <td>{manufacturer.PhoneNumber || ""}</td>
      <td>{manufacturer.Address || ""}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
      </td>
      <td>
        <button onClick={deleteRow}>Delete</button>
      </td>
    </tr>
  );
};

export default ManufacturerTableRow;


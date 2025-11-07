import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalesAssociateTableRow = ({ associate, fetchSalesAssociates }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/salesAssociates/edit/" + associate.AssociateID, { state: { associate } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "salesAssociates/" + associate.AssociateID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Sales associate deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting sales associate");
      console.log(err);
    }
    fetchSalesAssociates();
  };

  return (
    <tr key={associate.AssociateID}>
      <td>{associate.AssociateID}</td>
      <td>{associate.FirstName}</td>
      <td>{associate.LastName}</td>
      <td>{associate.Email || ""}</td>
      <td>{associate.PhoneNumber || ""}</td>
      <td>{associate.Type || ""}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
      </td>
      <td>
        <button onClick={deleteRow}>Delete</button>
      </td>
    </tr>
  );
};

export default SalesAssociateTableRow;


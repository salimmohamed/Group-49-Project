import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalesDetailTableRow = ({ detail, fetchSalesDetails }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/salesDetails/edit/" + detail.SalesDetailID, { state: { detail } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "salesDetails/" + detail.SalesDetailID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Sales detail deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting sales detail");
      console.log(err);
    }
    fetchSalesDetails();
  };

  return (
    <tr key={detail.SalesDetailID}>
      <td>{detail.SalesDetailID}</td>
      <td>{detail.SaleID}</td>
      <td>{detail.ProductID}</td>
      <td>{detail.Quantity}</td>
      <td>${detail.ItemPrice}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
      </td>
      <td>
        <button onClick={deleteRow}>Delete</button>
      </td>
    </tr>
  );
};

export default SalesDetailTableRow;


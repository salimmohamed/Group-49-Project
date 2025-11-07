import axios from "axios";
import { useNavigate } from "react-router-dom";

const SaleTableRow = ({ sale, fetchSales }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/sales/edit/" + sale.SaleID, { state: { sale } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "sales/" + sale.SaleID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Sale deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting sale");
      console.log(err);
    }
    fetchSales();
  };

  return (
    <tr key={sale.SaleID}>
      <td>{sale.SaleID}</td>
      <td>{sale.CustomerID}</td>
      <td>{sale.AssociateID}</td>
      <td>{sale.OrderDate}</td>
      <td>{sale.Status}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
      </td>
      <td>
        <button onClick={deleteRow}>Delete</button>
      </td>
    </tr>
  );
};

export default SaleTableRow;


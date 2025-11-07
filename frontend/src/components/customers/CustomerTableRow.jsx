import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerTableRow = ({ customer, fetchCustomers }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/customers/edit/" + customer.CustomerID, { state: { customer } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "customers/" + customer.CustomerID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Customer deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting customer");
      console.log(err);
    }
    fetchCustomers();
  };

  return (
    <tr key={customer.CustomerID}>
      <td>{customer.CustomerID}</td>
      <td>{customer.FirstName}</td>
      <td>{customer.LastName}</td>
      <td>{customer.Email || ""}</td>
      <td>{customer.PhoneNumber || ""}</td>
      <td>{customer.Address || ""}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
      </td>
      <td>
        <button onClick={deleteRow}>Delete</button>
      </td>
    </tr>
  );
};

export default CustomerTableRow;


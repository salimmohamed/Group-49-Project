import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateSalesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevDetail = location.state?.detail || {};
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    SaleID: prevDetail.SaleID || "",
    ProductID: prevDetail.ProductID || "",
    Quantity: prevDetail.Quantity || "",
    ItemPrice: prevDetail.ItemPrice || "",
  });

  useEffect(() => {
    // Redirect if no sales detail state was passed
    if (!location.state || !location.state.detail) {
      navigate("/salesDetails");
      return;
    }

    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
        const salesURL = API_URL + "sales";
        const productsURL = API_URL + "products";
        const [salesRes, productsRes] = await Promise.all([
          axios.get(salesURL),
          axios.get(productsURL),
        ]);
        setSales(salesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [location.state, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const URL = import.meta.env.VITE_API_URL + "salesDetails/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating sales detail");
      } else {
        alert(response.data.message);
        navigate("/salesDetails");
      }
    } catch (err) {
      console.log("Error updating sales detail:", err);
      alert("Error updating sales detail");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Sales Detail</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sale:</label>
          <select
            name="SaleID"
            value={formData.SaleID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Sale</option>
            {sales.map((sale) => (
              <option key={sale.SaleID} value={sale.SaleID}>
                Sale #{sale.SaleID} - {sale.OrderDate}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Product:</label>
          <select
            name="ProductID"
            value={formData.ProductID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.ProductID} value={product.ProductID}>
                {product.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="Quantity"
            onChange={handleInputChange}
            required
            value={formData.Quantity}
          />
        </div>
        <div>
          <label>Item Price:</label>
          <input
            type="number"
            step="0.01"
            name="ItemPrice"
            onChange={handleInputChange}
            required
            value={formData.ItemPrice}
          />
        </div>
        <button type="button" onClick={() => navigate("/salesDetails")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateSalesDetail;


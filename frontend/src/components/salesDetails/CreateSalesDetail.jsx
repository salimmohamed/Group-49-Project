import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateSalesDetail() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    SaleID: "",
    ProductID: "",
    Quantity: "",
    ItemPrice: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesURL = import.meta.env.VITE_API_URL + "sales";
        const productsURL = import.meta.env.VITE_API_URL + "products";
        const [salesRes, productsRes] = await Promise.all([
          axios.get(salesURL),
          axios.get(productsURL),
        ]);
        setSales(salesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSalesDetail = {
      SaleID: formData.SaleID,
      ProductID: formData.ProductID,
      Quantity: formData.Quantity,
      ItemPrice: formData.ItemPrice,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "salesDetails";
      const response = await axios.post(URL, newSalesDetail);
      if (response.status === 201) {
        navigate("/salesDetails");
      } else {
        alert("Error creating sales detail");
      }
    } catch (error) {
      alert("Error creating sales detail");
      console.error("Error creating sales detail:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      SaleID: "",
      ProductID: "",
      Quantity: "",
      ItemPrice: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Add Sales Detail</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="SaleID">Sale</label>
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
        <label htmlFor="ProductID">Product</label>
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
        <label htmlFor="Quantity">Quantity</label>
        <input
          type="number"
          name="Quantity"
          value={formData.Quantity}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="ItemPrice">Item Price</label>
        <input
          type="number"
          step="0.01"
          name="ItemPrice"
          value={formData.ItemPrice}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Sales Detail</button>
      </form>
    </>
  );
}

export default CreateSalesDetail;


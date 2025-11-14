import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateSalesDetail() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    SaleID: "",
    ProductID: "",
    Quantity: "",
    ItemPrice: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
        const salesURL = API_URL + "sales";
        const productsURL = API_URL + "products";
        const [salesRes, productsRes] = await Promise.all([
          axios.get(salesURL),
          axios.get(productsURL),
        ]);
        setSales(Array.isArray(salesRes.data) ? salesRes.data : []);
        setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSales([]);
        setProducts([]);
      }
      setLoading(false);
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

  const handleCancel = () => {
    navigate("/salesDetails");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Sales Detail</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <Label htmlFor="SaleID">
            Sale <span className="text-destructive">*</span>
          </Label>
          <Select
            required
            value={formData.SaleID}
            onValueChange={(value) => setFormData({ ...formData, SaleID: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sale" />
            </SelectTrigger>
            <SelectContent>
              {sales.map((sale) => (
                <SelectItem key={sale.SaleID} value={sale.SaleID.toString()}>
                  Sale #{sale.SaleID} - {sale.OrderDate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ProductID">
            Product <span className="text-destructive">*</span>
          </Label>
          <Select
            required
            value={formData.ProductID}
            onValueChange={(value) => setFormData({ ...formData, ProductID: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.ProductID} value={product.ProductID.toString()}>
                  {product.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="Quantity">
              Quantity <span className="text-destructive">*</span>
            </Label>
            <Input
              id="Quantity"
              name="Quantity"
              type="number"
              required
              value={formData.Quantity}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ItemPrice">
              Item Price <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ItemPrice"
              name="ItemPrice"
              type="number"
              step="0.01"
              required
              value={formData.ItemPrice}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">Add Sales Detail</Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateSalesDetail;


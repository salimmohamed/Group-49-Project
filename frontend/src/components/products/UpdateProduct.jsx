import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevProduct = location.state?.product || {};
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    Name: prevProduct.Name || "",
    Description: prevProduct.Description || "",
    Price: prevProduct.Price || "",
    Stock: prevProduct.Stock || "",
    ManufacturerID: prevProduct.ManufacturerID || "",
  });

  useEffect(() => {
    // Redirect if no product state was passed
    if (!location.state || !location.state.product) {
      navigate("/products");
      return;
    }

    const fetchManufacturers = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
        const URL = API_URL + "manufacturers";
        const response = await axios.get(URL);
        setManufacturers(response.data);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
      setLoading(false);
    };
    fetchManufacturers();
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
      const URL = import.meta.env.VITE_API_URL + "products/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating product");
      } else {
        alert(response.data.message);
        navigate("/products");
      }
    } catch (err) {
      console.log("Error updating product:", err);
      alert("Error updating product");
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Update Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <Label htmlFor="Name">
            Product Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="Name"
            name="Name"
            type="text"
            required
            value={formData.Name}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="Description">Description</Label>
          <Input
            id="Description"
            name="Description"
            type="text"
            value={formData.Description}
            onChange={handleInputChange}
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="Price">
              Price <span className="text-destructive">*</span>
            </Label>
            <Input
              id="Price"
              name="Price"
              type="number"
              step="0.01"
              required
              value={formData.Price}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Stock">Stock Quantity</Label>
            <Input
              id="Stock"
              name="Stock"
              type="number"
              value={formData.Stock}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ManufacturerID">Manufacturer</Label>
          <Select
            value={formData.ManufacturerID.toString()}
            onValueChange={(value) => setFormData({ ...formData, ManufacturerID: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select manufacturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null">None</SelectItem>
              {manufacturers.map((manufacturer) => (
                <SelectItem key={manufacturer.ManufacturerID} value={manufacturer.ManufacturerID.toString()}>
                  {manufacturer.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">Update</Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;

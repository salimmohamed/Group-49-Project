import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateManufacturer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevManufacturer = location.state?.manufacturer || {};

  const [formData, setFormData] = useState({
    Name: prevManufacturer.Name || "",
    ContactEmail: prevManufacturer.ContactEmail || "",
    PhoneNumber: prevManufacturer.PhoneNumber || "",
    Address: prevManufacturer.Address || "",
  });

  useEffect(() => {
    // Redirect if no manufacturer state was passed
    if (!location.state || !location.state.manufacturer) {
      navigate("/manufacturers");
      return;
    }
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
      const URL = import.meta.env.VITE_API_URL + "manufacturers/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating manufacturer");
      } else {
        alert(response.data.message);
        navigate("/manufacturers");
      }
    } catch (err) {
      console.log("Error updating manufacturer:", err);
      alert("Error updating manufacturer");
    }
  };

  const handleCancel = () => {
    navigate("/manufacturers");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Update Manufacturer</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <Label htmlFor="Name">
            Manufacturer Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="Name"
            name="Name"
            type="text"
            required
            value={formData.Name}
            onChange={handleInputChange}
            placeholder="Enter manufacturer name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ContactEmail">Contact Email</Label>
          <Input
            id="ContactEmail"
            name="ContactEmail"
            type="email"
            value={formData.ContactEmail}
            onChange={handleInputChange}
            placeholder="contact@example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="PhoneNumber">Phone Number</Label>
            <Input
              id="PhoneNumber"
              name="PhoneNumber"
              type="text"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              placeholder="555-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Address">Address</Label>
            <Input
              id="Address"
              name="Address"
              type="text"
              value={formData.Address}
              onChange={handleInputChange}
              placeholder="123 Main St, City, State"
            />
          </div>
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

export default UpdateManufacturer;


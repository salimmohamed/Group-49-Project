import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevCustomer = location.state.customer;

  const [formData, setFormData] = useState({
    FirstName: prevCustomer.FirstName || "",
    LastName: prevCustomer.LastName || "",
    Email: prevCustomer.Email || "",
    PhoneNumber: prevCustomer.PhoneNumber || "",
    Address: prevCustomer.Address || "",
  });

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
      const URL = import.meta.env.VITE_API_URL + "customers/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating customer");
      } else {
        alert(response.data.message);
        navigate("/customers");
      }
    } catch (err) {
      console.log("Error updating customer:", err);
      alert("Error updating customer");
    }
  };

  const handleCancel = () => {
    navigate("/customers");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Update Customer</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <Label htmlFor="FirstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="FirstName"
            name="FirstName"
            type="text"
            required
            value={formData.FirstName}
            onChange={handleInputChange}
            placeholder="Enter first name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="LastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="LastName"
            name="LastName"
            type="text"
            required
            value={formData.LastName}
            onChange={handleInputChange}
            placeholder="Enter last name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="Email">Email</Label>
          <Input
            id="Email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleInputChange}
            placeholder="Enter email address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="PhoneNumber">Phone Number</Label>
          <Input
            id="PhoneNumber"
            name="PhoneNumber"
            type="text"
            value={formData.PhoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
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
            placeholder="Enter address"
          />
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

export default UpdateCustomer;

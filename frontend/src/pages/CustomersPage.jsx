import { Routes, Route, Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateCustomer from "../components/customers/CreateCustomer";
import CustomersTable from "../components/customers/CustomersTable";
import UpdateCustomer from "../components/customers/UpdateCustomer";

function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer information and contacts
          </p>
        </div>
        <Link to="/customers/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Customer
          </Button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<CustomersTable />} />
        <Route path="/add" element={<CreateCustomer />} />
        <Route path="/edit/:id" element={<UpdateCustomer />} />
      </Routes>
    </div>
  );
}

export default CustomersPage;


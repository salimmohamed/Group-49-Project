import { Routes, Route, Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateSale from "../components/sales/CreateSale";
import SalesTable from "../components/sales/SalesTable";
import UpdateSale from "../components/sales/UpdateSale";

function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <p className="text-muted-foreground mt-1">
            Manage sales orders and transactions
          </p>
        </div>
        <Link to="/sales/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Sale
          </Button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<SalesTable />} />
        <Route path="/add" element={<CreateSale />} />
        <Route path="/edit/:id" element={<UpdateSale />} />
      </Routes>
    </div>
  );
}

export default SalesPage;


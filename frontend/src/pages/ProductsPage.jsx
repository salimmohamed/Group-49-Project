import { Routes, Route, Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateProduct from "../components/products/CreateProduct";
import ProductsTable from "../components/products/ProductsTable";
import UpdateProduct from "../components/products/UpdateProduct";

function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage product inventory and information
          </p>
        </div>
        <Link to="/products/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<ProductsTable />} />
        <Route path="/add" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default ProductsPage;


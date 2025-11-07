import { Routes, Route, Link } from "react-router-dom";
import CreateSale from "../components/sales/CreateSale";
import SalesTable from "../components/sales/SalesTable";
import UpdateSale from "../components/sales/UpdateSale";

function SalesPage() {
  return (
    <div>
      <h1>Sales</h1>
      <nav>
        <ul>
          <li>
            <Link to="/sales">View All</Link>
          </li>
          <li>
            <Link to="/sales/add">Add Sale</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SalesTable />} />
        <Route path="/add" element={<CreateSale />} />
        <Route path="/edit/:id" element={<UpdateSale />} />
      </Routes>
    </div>
  );
}

export default SalesPage;


import { Routes, Route, Link } from "react-router-dom";
import CreateSalesDetail from "../components/salesDetails/CreateSalesDetail";
import SalesDetailsTable from "../components/salesDetails/SalesDetailsTable";
import UpdateSalesDetail from "../components/salesDetails/UpdateSalesDetail";

function SalesDetailsPage() {
  return (
    <div>
      <h1>Sales Details</h1>
      <nav>
        <ul>
          <li>
            <Link to="/salesDetails">View All</Link>
          </li>
          <li>
            <Link to="/salesDetails/add">Add Sales Detail</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SalesDetailsTable />} />
        <Route path="/add" element={<CreateSalesDetail />} />
        <Route path="/edit/:id" element={<UpdateSalesDetail />} />
      </Routes>
    </div>
  );
}

export default SalesDetailsPage;


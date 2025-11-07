import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <h1>Tech R Us Sales Management System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/sales">Sales</Link>
          </li>
          <li>
            <Link to="/salesDetails">Sales Details</Link>
          </li>
          <li>
            <Link to="/salesAssociates">Sales Associates</Link>
          </li>
          <li>
            <Link to="/manufacturers">Manufacturers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

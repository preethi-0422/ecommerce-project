import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Store</h2>

      <div className="nav-links">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
        

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../services/api';

export default function Navbar({ user, setUser }) {
  const handleLogout = async () => {
    await logout();
    setUser(null);
  };
  const firstLetter = user ? (user.name || user.email || '?')[0].toUpperCase() : '';
  return (
    <nav className="navbar">
      <div className="navbar-brand">Naksh <span className="brand-highlight">Jewels</span></div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">COLLECTION</Link>
        <Link to="/cart" className="nav-link"><FaShoppingCart style={{ marginRight: 6, marginBottom: -2 }} />CART</Link>
        {user ? (
          <div className="navbar-user">
            <div className="profile-avatar">{firstLetter}</div>
            <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /></button>
          </div>
        ) : (
          <Link to="/login" className="nav-link login-link">LOGIN</Link>
        )}
      </div>
    </nav>
  );
}

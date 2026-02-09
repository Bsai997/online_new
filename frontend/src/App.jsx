
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

function AppRoutes() {
  const { user, setUser, notification, setNotification } = useAppContext();
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#1a1a2e',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '12px',
          zIndex: 1001,
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          fontSize: '0.95rem',
          fontWeight: 500,
          borderLeft: '4px solid #c9a84c'
        }}>
          {notification}
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home user={user} setNotification={setNotification} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart setNotification={setNotification} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

import { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({ name, email, password, phone });
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px 0 #e6c87a22' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <input
          type="tel"
          placeholder="Phone (10-15 digits)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          minLength={10}
          maxLength={15}
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button className="button primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <div style={{ color: 'crimson', marginTop: 12 }}>{error}</div>}
      <div style={{ marginTop: 18, textAlign: 'center' }}>
        <a href="/login">Already have an account? Login</a>
      </div>
    </div>
  );
}

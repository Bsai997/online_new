import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login({ email, password });
      setUser(res.data.data);
      navigate('/');
    } catch {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px 0 #e6c87a22' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <div style={{ color: 'crimson', marginTop: 12 }}>{error}</div>}
      <div style={{ marginTop: 18, textAlign: 'center' }}>
        <a href="/register">Don't have an account? Register</a>
      </div>
    </div>
  );
}

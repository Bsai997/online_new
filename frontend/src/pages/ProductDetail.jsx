import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addToCart } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProductById(id).then(res => {
      setProduct(res.data.data);
      setLoading(false);
    }).catch(() => {
      setError('Product not found');
      setLoading(false);
    });
  }, [id]);

  const handleAdd = async () => {
    setError('');
    try {
      await addToCart(id, 1);
      setAdded(true);
    } catch {
      setError('Please login to add to cart.');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', margin: '3rem 0' }}>Loading...</div>;
  if (error) return <div style={{ color: 'crimson', textAlign: 'center' }}>{error}</div>;
  if (!product) return null;

  return (
    <div style={{ maxWidth: 900, margin: '2.5rem auto', padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
        <img
          src={`https://source.unsplash.com/600x450/?jewelry,${product.name}`}
          alt={product.name}
          style={{ width: 400, borderRadius: '1.2rem', objectFit: 'cover', aspectRatio: '4/3', maxWidth: '100%' }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: 8 }}>{product.name}</h2>
          <div style={{ color: '#b8860b', fontWeight: 600, fontSize: '1.3rem', marginBottom: 8 }}>₹{product.price}</div>
          <div style={{ marginBottom: 8 }}>Stock: {product.stock}</div>
          <div style={{ marginBottom: 16 }}>
            <span className="category-pill">{product.category}</span>
          </div>
          <div style={{ color: '#8d7b5a', fontSize: '1.1rem', marginBottom: 24 }}>
            A beautiful piece to elevate your style. Perfect for gifting or self-indulgence.
          </div>
          <button className="button primary" onClick={handleAdd} disabled={added}>
            {added ? 'Added' : 'Add to Cart'}
          </button>
          {error && <div style={{ color: 'crimson', marginTop: 12 }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}

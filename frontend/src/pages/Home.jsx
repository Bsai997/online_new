import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, addToCart } from '../services/api';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import diamondnecklace from '../assets/diamondnecklace.webp';
import goldjewellary from '../assets/goldjewellary.webp';
import goldring from '../assets/goldring.jpg';
import silverbracelet from '../assets/silverbracelet.jpg';
import silverchain from '../assets/silverchain.jpg';
import silverring from '../assets/silverringjpg.jpg';

export default function Home({ user, setNotification }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllProducts().then(res => {
      setProducts(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const getMaterial = (name) => {
    const n = name.toLowerCase();
    if (n.includes('gold')) return 'Gold';
    if (n.includes('silver')) return 'Silver';
    if (n.includes('diamond')) return 'Diamond';
    return '';
  };

  const filteredProducts = products.filter(p => {
    if (selected === 'All') return true;
    const name = p.name.toLowerCase();
    if (selected === 'Gold') return name.includes('gold');
    if (selected === 'Silver') return name.includes('silver');
    if (selected === 'Diamond') return name.includes('diamond');
    return false;
  });

  const handleAdd = async (id) => {
    if (!user) {
      localStorage.setItem('pendingCartAdd', id);
      navigate('/login');
      return;
    }
    setAdding(id);
    setError('');
    try {
      await addToCart(id, 1);
      setNotification('Item added to cart!');
      setTimeout(() => setNotification(''), 3000);
    } catch (e) {
      console.error('Add to cart error:', e);
      setError(e.response?.data?.message || e.message || 'Failed to add to cart.');
    }
    setAdding(null);
  };

  return (
    <div className="main-content">
      <section style={{ marginTop: '2.5rem' }}>
        <h1 className="collection-title">
          Our <span className="gold">Collection</span>
        </h1>
        <div className="collection-desc">
          Timeless craftsmanship, modern elegance
        </div>
      </section>
      <div className="category-filter">
        <CategoryFilter selected={selected} onSelect={setSelected} />
      </div>
      {error && <div style={{ color: 'crimson', marginBottom: 16 }}>{error}</div>}
      {loading ? (
        <div style={{ textAlign: 'center', margin: '3rem 0' }}>Loading...</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(p => {
            let image = diamondnecklace;
            const name = p.name.toLowerCase();
            if (name.includes('necklace')) image = diamondnecklace;
            else if (name.includes('bracelet')) image = name.includes('silver') ? silverbracelet : goldjewellary;
            else if (name.includes('ring')) image = name.includes('silver') ? silverring : goldring;
            else if (name.includes('chain')) image = name.includes('silver') ? silverchain : goldjewellary;
            // fallback: diamondnecklace
            return (
              <ProductCard
                key={p._id}
                product={p}
                categoryName={getMaterial(p.name)}
                onAdd={handleAdd}
                adding={adding === p._id}
                image={image}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

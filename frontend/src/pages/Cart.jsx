import { useEffect, useState } from 'react';
import { getCartProducts, deleteCartProduct, deleteCartProductById, updateCartProductQuantity, createOrder } from '../services/api';
import diamondnecklace from '../assets/diamondnecklace.webp';
import goldjewellary from '../assets/goldjewellary.webp';
import goldring from '../assets/goldring.jpg';
import silverbracelet from '../assets/silverbracelet.jpg';
import silverchain from '../assets/silverchain.jpg';
import silverring from '../assets/silverringjpg.jpg';


export default function Cart({ setNotification }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState('');

  const fetchCart = () => {
    setLoading(true);
    getCartProducts().then(res => {
      setCart(res.data.data || null);
      setLoading(false);
    }).catch(() => {
      setError('Please login to view cart.');
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleClear = async () => {
    await deleteCartProduct();
    fetchCart();
  };

  const handleCheckout = async (p_id, quantity) => {
    if (!address) return setError('Please enter address.');
    setOrdering(true);
    setError('');
    try {
      await createOrder(p_id, quantity, address);
      setSuccess('Order placed!');
      fetchCart();
    } catch {
      setError('Order failed.');
    }
    setOrdering(false);
  };

  const subtotal = cart && cart.items ? cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

  if (loading) return <div style={{ textAlign: 'center', margin: '3rem 0' }}>Loading...</div>;
  if (error) return <div style={{ color: 'crimson', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 1200, margin: '2.5rem auto', padding: '1rem', display: 'flex', gap: '2.5rem', justifyContent: 'center' }}>
      <div style={{ flex: 2 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '2.2rem', color: '#222', marginBottom: 24 }}>
          Shopping <span style={{ color: '#b8860b' }}>Cart</span>
        </h2>
        {!cart || !cart.items || cart.items.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#8d7b5a' }}>Your cart is empty.</div>
        ) : (
          <div style={{ background: '#fcf8f3', borderRadius: 16, boxShadow: '0 2px 12px #e6c87a22', padding: '1.5rem', marginBottom: 24 }}>
            {cart.items.map(item => {
              let image = diamondnecklace;
              const name = item.productname.toLowerCase();
              if (name.includes('necklace')) image = diamondnecklace;
              else if (name.includes('bracelet') && name.includes('gold')) image = goldbracelet;
              else if (name.includes('bracelet') && name.includes('silver')) image = silverbracelet;
              else if (name.includes('earring')) image = goldearrings;
              else if (name.includes('ring') && name.includes('gold')) image = goldring;
              else if (name.includes('ring') && name.includes('silver')) image = silverring;
              else if (name.includes('chain') && name.includes('gold')) image = goldjewellary;
              else if (name.includes('chain') && name.includes('silver')) image = silverchain;
              // fallback: diamondnecklace
              return (
                <div key={item.productid} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.2rem' }}>
                  <img src={image} alt={item.productname} style={{ width: 90, height: 90, borderRadius: '1rem', objectFit: 'cover', background: '#fff' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#222' }}>{item.productname}</div>
                    <div style={{ color: '#8d7b5a', fontSize: '1rem', marginBottom: 8 }}>{name.includes('earring') ? 'Earrings' : name.includes('ring') ? 'Ring' : name.includes('bracelet') ? 'Bracelet' : name.includes('necklace') ? 'Necklace' : name.includes('chain') ? 'Chain' : 'Jewelry'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button
                        className="button secondary"
                        style={{ width: 32, height: 32, fontSize: '1.2rem', padding: 0 }}
                        onClick={async () => {
                          if (item.quantity > 1) {
                            await updateCartProductQuantity(item.productid, item.quantity - 1);
                            fetchCart();
                          }
                        }}
                      >-</button>
                      <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#222' }}>{item.quantity}</span>
                      <button
                        className="button secondary"
                        style={{ width: 32, height: 32, fontSize: '1.2rem', padding: 0 }}
                        onClick={async () => {
                          await updateCartProductQuantity(item.productid, item.quantity + 1);
                          fetchCart();
                        }}
                      >+</button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, color: '#b8860b', fontSize: '1.2rem' }}>₹{item.price * item.quantity}</div>
                  <button
                    className="button secondary"
                    style={{ background: 'none', border: 'none', color: '#b8860b', fontSize: '1.2rem', marginLeft: 12 }}
                    onClick={async () => {
                      await deleteCartProductById(item.productid);
                      setNotification('Item removed from cart!');
                      setTimeout(() => setNotification(''), 3000);
                      fetchCart();
                    }}
                  >
                    <span role="img" aria-label="delete">🗑️</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ background: '#fcf8f3', borderRadius: 16, boxShadow: '0 2px 12px #e6c87a22', padding: '1.5rem' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.3rem', color: '#222', marginBottom: 16 }}>Order Summary</div>
          {cart && cart.items && cart.items.length > 0 && (
            <div>
              {cart.items.map(item => (
                <div key={item.productid} style={{ marginBottom: 12, color: '#8d7b5a' }}>
                  {item.productname} × {item.quantity} <span style={{ float: 'right', color: '#b8860b' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ borderTop: '1px solid #e6c87a', margin: '16px 0' }}></div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#222', marginBottom: 16 }}>Total <span style={{ float: 'right', color: '#b8860b' }}>₹{subtotal}</span></div>
          <button className="button primary" style={{ width: '100%', marginBottom: 12 }}>Proceed to Checkout</button>
          <button className="button secondary" style={{ width: '100%' }}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

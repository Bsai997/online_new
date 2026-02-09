import './ProductCard.css';
import { FaShoppingCart } from 'react-icons/fa';

const descriptions = {
  necklace: 'A stunning statement piece that adds brilliance and sophistication to any outfit.',
  chain: 'Sleek and versatile — perfect for layering or wearing solo with timeless appeal.',
  ring: 'Crafted with precision, this ring embodies elegance in every curve and detail.',
  bracelet: 'A graceful accent for your wrist, blending artistry with everyday luxury.',
  earring: 'Lightweight and eye-catching, designed to frame your face with sparkle.',
  default: 'A masterfully crafted piece that celebrates tradition and modern design.',
};

function getDescription(name) {
  const n = name.toLowerCase();
  if (n.includes('necklace')) return descriptions.necklace;
  if (n.includes('chain')) return descriptions.chain;
  if (n.includes('ring')) return descriptions.ring;
  if (n.includes('bracelet')) return descriptions.bracelet;
  if (n.includes('earring')) return descriptions.earring;
  return descriptions.default;
}

export default function ProductCard({ product, categoryName, onAdd, image }) {
  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={image} alt={product.name} />
      </div>
      <div className="card-body">
        <span className="card-category">{categoryName}</span>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-desc">{getDescription(product.name)}</p>
        <div className="card-price">₹{product.price.toLocaleString()}</div>
        <button className="card-btn" onClick={() => onAdd(product._id)}>
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}

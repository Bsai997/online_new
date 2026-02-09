import './CategoryFilter.css';

export default function CategoryFilter({ selected, onSelect }) {
  const materials = ['All', 'Gold', 'Silver', 'Diamond'];
  return (
    <div style={{ margin: '1.5rem 0' }}>
      {materials.map(mat => (
        <button
          key={mat}
          className={`category-pill${selected === mat ? ' selected' : ''}`}
          onClick={() => onSelect(mat)}
        >
          {mat}
        </button>
      ))}
    </div>
  );
}

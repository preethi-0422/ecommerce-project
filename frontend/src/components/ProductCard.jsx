import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>
      <p>{product.category?.name}</p>

      <Link to={`/product/${product.id}`}>
        <button>View</button>
      </Link>
    </div>
  );
}

export default ProductCard;
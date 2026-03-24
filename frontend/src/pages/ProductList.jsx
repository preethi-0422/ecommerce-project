import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Products</h2>

      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <img src={p.imageUrl} alt="" />
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>
            <Link to={`/product/${p.id}`}>
              <button>View</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
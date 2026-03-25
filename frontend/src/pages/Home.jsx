import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    String(p.id).includes(search) ||
    (p.category?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Products</h2>

      <input
        placeholder="Search by name, id, category"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>
            <p>Category: {p.category?.name}</p>
            <p>ID: {p.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
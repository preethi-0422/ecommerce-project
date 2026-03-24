import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productService";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹ {product.price}</h3>
      <p>{product.category?.name}</p>
    </div>
  );
}

export default ProductDetail;
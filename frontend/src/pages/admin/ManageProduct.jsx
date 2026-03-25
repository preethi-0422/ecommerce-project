import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct
} from "../../api/productService";
import { getCategories } from "../../api/categoryService";

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: ""
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  // ✅ OPEN UPDATE FORM
  const handleEdit = (product) => {
    setEditingProduct(product);

    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      category: product.category?.id
    });
  };

  // ✅ HANDLE FORM CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SUBMIT UPDATE
  const handleUpdateSubmit = async () => {
    const payload = {
      name: form.name,
      price: form.price,
      description: form.description,
      stock: form.stock,
      category: {
        id: form.category
      }
    };

    await updateProduct(editingProduct.id, payload);

    alert("Updated successfully");

    setEditingProduct(null);
    loadProducts();
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>

      {/* PRODUCT LIST */}
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>
            <p>{p.category?.name}</p>

            <button onClick={() => handleEdit(p)}>Update</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* UPDATE FORM */}
      {editingProduct && (
        <div className="card">
          <h3>Update Product</h3>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
          />

          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button onClick={handleUpdateSubmit}>Update Product</button>
          <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ManageProduct;
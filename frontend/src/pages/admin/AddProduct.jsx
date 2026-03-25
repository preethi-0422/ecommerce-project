import { useEffect, useState } from "react";
import { createProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

function AddProduct() {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: ""
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createProduct({
      ...form,
      category: { id: form.category }
    });

    alert("Product added");
  };

  return (
    <div className="card">
      <h2>Add Product</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="stock" placeholder="Stock" onChange={handleChange} />

      {/* DROPDOWN */}
      <select name="category" onChange={handleChange}>
  <option value="">Select Category</option>
  {categories.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>

      <button onClick={handleSubmit}>Add Product</button>

      
    </div>
  );
}

export default AddProduct;
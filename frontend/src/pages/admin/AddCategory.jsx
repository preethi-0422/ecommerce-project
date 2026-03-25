import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory
} from "../../services/categoryService";

function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    const exists = categories.some(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert("Category already exists");
      return;
    }

    await createCategory({ name });

    setName("");         // clear input
    loadCategories();    // refresh list
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    loadCategories(); // refresh after delete
  };

  return (
    <div className="card">
      <h2>Manage Categories</h2>

      {/* ADD CATEGORY */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter category"
      />
      <button onClick={handleAdd}>Add Category</button>

      {/* CATEGORY LIST */}
      <div className="grid">
        {categories.map((c) => (
          <div key={c.id} className="card">
            <h3>{c.name}</h3>
            <button onClick={() => handleDelete(c.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCategory;
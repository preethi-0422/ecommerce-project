import { useState } from "react";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProduct";
import AddCategory from "./admin/AddCategory";

function Admin() {
  const [view, setView] = useState("addProduct");

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <button onClick={() => setView("addProduct")}>Add Product</button>
      <button onClick={() => setView("manageProduct")}>Manage Product</button>
      {<button onClick={() => setView("category")}>Manage Category</button>}

      <div>
        {view === "addProduct" && <AddProduct />}
        {view === "manageProduct" && <ManageProduct />}
        {view === "category" && <AddCategory />}
      </div>
    </div>
  );
}

export default Admin;